package nz.ac.victoria.ecs.glams.controller;

//import com.google.gson.Gson;

import com.google.gson.Gson;
import nz.ac.victoria.ecs.glams.service.AuthenticationService;
import nz.ac.victoria.ecs.glams.service.UserService;
import nz.ac.victoria.ecs.glams.vo.LoginInfo;
import nz.ac.victoria.ecs.glams.vo.LoginResp;
import nz.ac.victoria.ecs.glams.vo.User;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;

/**
 * Created by limengheng on 09/08/17.
 * Controller for login service
 */
@RestController
@RequestMapping(value = "/login")
public class LoginController {
    @Autowired
    private AuthenticationService aService;
    @Autowired
    private UserService userService;

    /**
     * Description: Member login in
     *
     * @param body
     * @httpMethod post
     * @mediaType json
     */
    @RequestMapping(value = "/member", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String login(@RequestBody String body,
                        HttpServletRequest req, HttpServletResponse resp) {
        System.out.println(body);
        User user = new Gson().fromJson(body, User.class);
        LoginResp loginResp = new LoginResp();
        if (userService.authenticate(user)) {
            loginResp.setStatus(1);
        } else {
            loginResp.setStatus(0);
        }
        loginResp.setRole(user.getRole());
        loginResp.setUserid(user.getUserid());
        String response = new Gson().toJson(loginResp);
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        return response;
    }

}
