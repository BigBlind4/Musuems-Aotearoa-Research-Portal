package nz.ac.victoria.ecs.glams.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by limengheng on 09/08/17.
 */
@RestController
@RequestMapping(value = "/search")
public class Search {
    @RequestMapping(value = "/hello", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getApp(@RequestBody String body,
                         HttpServletRequest req, HttpServletResponse resp) {
        System.out.println(body);
        return "{result: hello}";
    }

    @RequestMapping(value = "/records", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getApp(@RequestParam("api_key") String apiKey,
                         @RequestParam("text") String text, HttpServletResponse resp) {
        System.out.println("apiKey="+apiKey);
        System.out.println("text="+text);
        String response ="";
        int statusCode =0;
        if(text!=null && !"".equals(text.trim())){
            String[] strArray = text.split(" ");
            StringBuffer urlBuffer = new StringBuffer("http://api.digitalnz.org/v3/records.json?api_key="+apiKey+"&text=");
            for(int i = 0; i< strArray.length; i++){
                urlBuffer.append(strArray[i]);
                if(i != (strArray.length - 1) ){
                    urlBuffer.append("+");
                }
            }
            try{
                HttpClient httpClient = new HttpClient();
                GetMethod getMethod = new GetMethod(urlBuffer.toString());
                statusCode = httpClient.executeMethod(getMethod);
                byte[] responseBody = getMethod.getResponseBody();
                response = new String(responseBody, "utf-8");
                resp.setHeader("Access-Control-Allow-Origin","*");

            }
            catch(Exception e){
                System.out.println("Error["+statusCode+"]!!!!");
            }
        }
        return response;
    }

}
