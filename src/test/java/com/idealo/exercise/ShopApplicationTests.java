package com.idealo.exercise;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ShopApplicationTests {

    private static final String REQUEST_PARAM_ID = "id";
    private static final String REQUEST_PARAM_PAGE_SIZE = "size";
    private static final String REQUEST_PARAM_SORT = "sort";
    private static final String REQUEST_PARAM_MIN = "min";
    private static final String REQUEST_PARAM_MAX = "max";

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testRootURI() throws Exception {
        this.mockMvc.perform(get("/api")
                .accept(MediaType.parseMediaType("application/hal+json;charset=UTF-8")))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/hal+json;charset=UTF-8"))
                .andExpect(jsonPath("$._links.items.href").exists())
                .andExpect(jsonPath("$._links.categories.href").exists())
                .andDo(print());
    }

    @Test
    public void testItemsSearchURI() throws Exception {
        this.mockMvc.perform(get("/api/items/search")
                .accept(MediaType.parseMediaType("application/hal+json;charset=UTF-8")))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/hal+json;charset=UTF-8"))
                .andExpect(jsonPath("$._links.findByCategory_IdAndPriceBetween").exists())
                .andDo(print());
    }

    @Test
    public void testSortByAscending() throws Exception {
        ResultActions resultActions = this.mockMvc.perform(prepareRequest(false));
        validateBasicResponse(resultActions);
        assertCheapestItem(resultActions);
        resultActions.andDo(print());
    }

    @Test
    public void testSortByDescending() throws Exception {
        ResultActions resultActions = this.mockMvc.perform(prepareRequest(true));
        validateBasicResponse(resultActions);
        assertCostliestItem(resultActions);
        resultActions.andDo(print());
    }

    @Test
    public void testBetween() throws Exception {
        ResultActions resultActions = this.mockMvc.perform(prepareRequest("500", "503", "10"));
        resultActions.andExpect(status().isOk())
                .andExpect(content().contentType("application/hal+json;charset=UTF-8"))
                .andExpect(jsonPath("$._embedded.items").exists())
                .andExpect(jsonPath("$._embedded.items").isArray())
                .andExpect(jsonPath("$._embedded.items[0].title").value("BetweenStartItemCreatedForIntegrationTest"))
                .andExpect(jsonPath("$._embedded.items[0].text").value("This item is used in integration test to validate"))
                .andExpect(jsonPath("$._embedded.items[0].price").value(501))
                .andExpect(jsonPath("$._embedded.items[1].title").value("BetweenEndItemCreatedForIntegrationTest"))
                .andExpect(jsonPath("$._embedded.items[1].text").value("This item is used in integration test to validate"))
                .andExpect(jsonPath("$._embedded.items[1].price").value(502))
                .andExpect(jsonPath("$.page").exists())
                .andExpect(jsonPath("$.page.number").value(0))
                .andExpect(jsonPath("$.page.size").value(10))
                .andExpect(jsonPath("$.page.totalElements").value(2))
                .andExpect(jsonPath("$.page.totalPages").value(1))
                .andDo(print());
    }

    private void assertCheapestItem(ResultActions resultActions) throws Exception {
        resultActions
                .andExpect(jsonPath("$._embedded.items[0].title").value("CheapestItemCreatedForIntegrationTest"))
                .andExpect(jsonPath("$._embedded.items[0].text").value("This item is used in integration test to validate"))
                .andExpect(jsonPath("$._embedded.items[0].price").value(1));
    }


    private void assertCostliestItem(ResultActions resultActions) throws Exception {
        resultActions
                .andExpect(jsonPath("$._embedded.items[0].title").value("CostliestItemCreatedForIntegrationTest"))
                .andExpect(jsonPath("$._embedded.items[0].text").value("This item is used in integration test to validate"))
                .andExpect(jsonPath("$._embedded.items[0].price").value(9000));
    }

    private void validateBasicResponse(ResultActions resultActions) throws Exception {
        resultActions
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/hal+json;charset=UTF-8"))
                .andExpect(jsonPath("$._embedded.items").exists())
                .andExpect(jsonPath("$._embedded.items").isArray())
                .andExpect(jsonPath("$.page").exists())
                .andExpect(jsonPath("$.page.number").value(0))
                .andExpect(jsonPath("$.page.size").value(1))
                .andExpect(jsonPath("$.page.totalElements").value(4))
                .andExpect(jsonPath("$.page.totalPages").value(4));
    }

    private MockHttpServletRequestBuilder prepareRequest(String min, String max, String pageSize) {
        return get("/api/items/search/findByCategory_IdAndPriceBetween")
                .param(REQUEST_PARAM_ID, "1")
                .param(REQUEST_PARAM_PAGE_SIZE, pageSize)
                .param(REQUEST_PARAM_MIN, min)
                .param(REQUEST_PARAM_MAX, max);
    }

    private MockHttpServletRequestBuilder prepareRequest(boolean isSortByDesc) {
        return prepareRequest("1", "100000", isSortByDesc);
    }

    private MockHttpServletRequestBuilder prepareRequest(String min, String max, boolean isSortByDesc) {
        return get("/api/items/search/findByCategory_IdAndPriceBetween")
                .param(REQUEST_PARAM_ID, "1")
                .param(REQUEST_PARAM_PAGE_SIZE, "1")
                .param(REQUEST_PARAM_MIN, min)
                .param(REQUEST_PARAM_MAX, max)
                .param(REQUEST_PARAM_SORT, "price" + (isSortByDesc ? ",desc" : ""));
    }
}