package nz.ac.victoria.ecs.glams.controller;

//import com.google.gson.Gson;

import com.google.gson.Gson;
import nz.ac.victoria.ecs.glams.service.AuthenticationService;
import nz.ac.victoria.ecs.glams.service.UserService;
import nz.ac.victoria.ecs.glams.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by limengheng on 09/08/17.
 * Controller for accessing and updating user information
 */
@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private AuthenticationService aService;
    @Autowired
    private UserService userService;

    /**
     * Description: Get user profile by userId
     *
     * @param userid
     * @httpMethod get
     * @mediaType text
     */
    @RequestMapping(value = "/getUserProfile", method = RequestMethod.GET)
    public String details(@RequestParam("userid") Integer userid,
                          HttpServletRequest req, HttpServletResponse resp) {
        System.out.println("I‘m here!");
        User user = userService.getProfile(userid);
        user.setUsername(userService.getUserName(userid));
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        String response = new Gson().toJson(user);
        return response;
    }

    /**
     * Description: Update user profile by userId
     *
     * @param body
     * @httpMethod post
     * @mediaType json
     */
    @RequestMapping(value = "/updateProfile", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String updateProfile(@RequestBody String body,
                                HttpServletRequest req, HttpServletResponse resp) {
        System.out.println(body);
        User user = new Gson().fromJson(body, User.class);
        ActionResp actionResp = new ActionResp();
        if (userService.updateProfile(user)) {
            actionResp.setStatus(1);
            actionResp.setMessage("success");
        } else {
            actionResp.setStatus(0);
            actionResp.setMessage("failed");
        }
        String response = new Gson().toJson(actionResp);
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        return response;
    }

    /**
     * Description: Update user password by userId
     *
     * @param body
     * @httpMethod post
     * @mediaType json
     */
    @RequestMapping(value = "/updatePassword", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String updatePassword(@RequestBody String body,
                                 HttpServletRequest req, HttpServletResponse resp) {
        System.out.println(body);
        UpdatePasswordReq u = new Gson().fromJson(body, UpdatePasswordReq.class);
        ActionResp actionResp = new ActionResp();
        if (userService.updatePassword(u.getUserid(), u.getPassword(), u.getNewpassword())) {
            actionResp.setStatus(1);
            actionResp.setMessage("success");
        } else {
            actionResp.setStatus(0);
            actionResp.setMessage("failed");
        }
        String response = new Gson().toJson(actionResp);
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        return response;
    }

}
