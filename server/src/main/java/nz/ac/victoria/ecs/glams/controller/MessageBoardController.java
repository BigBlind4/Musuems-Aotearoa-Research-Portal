package nz.ac.victoria.ecs.glams.controller;

//import com.google.gson.Gson;

import com.google.gson.Gson;
import nz.ac.victoria.ecs.glams.service.AuthenticationService;
import nz.ac.victoria.ecs.glams.service.FileStoreService;
import nz.ac.victoria.ecs.glams.service.TopicService;
import nz.ac.victoria.ecs.glams.service.UserService;
import nz.ac.victoria.ecs.glams.vo.*;
import org.apache.commons.codec.binary.Base64;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by limengheng on 09/08/17.
 * Controller for message board actions (comments, posts, etc.)
 */
@RestController
@RequestMapping(value = "/messageboard")
public class MessageBoardController {
    @Autowired
    private AuthenticationService aService;
    @Autowired
    private TopicService topicService;
    @Autowired
    private UserService userService;

    private static final Logger LOGGER = LogManager.getLogger();

    /**
     * Description: Create a new topic by a member
     * @httpMethod post
     * @mediaType json
     * @param body
     */
    @RequestMapping(value = "/newPost", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String newPost(@RequestBody String body,
                          HttpServletRequest req, HttpServletResponse resp) {
        LOGGER.info("hello,im log4j!");
        System.out.println("I‘m here!");
        Topic topic = new Gson().fromJson(body, Topic.class);
        topic.setUsername(userService.getUserName(topic.getUserid()));
        topic.setCreatetime(getDate());
        topic.setLastupdate(topic.getCreatetime());
//        topic.setStatusindex(Status.getIndex(topic.getStatus()));
        ActionResp actionResp = new ActionResp();
        if (topicService.addTopics(topic)) {
            actionResp.setMessage("success");
            actionResp.setStatus(0);
        } else {
            actionResp.setMessage("failed");
            actionResp.setStatus(1);
        }
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        String response = new Gson().toJson(actionResp);
        return response;
    }

    /**
     * Description: Get topic list
     * @httpMethod get
     * @mediaType text
     * @param perpage
     * @param page
     */
    @RequestMapping(value = "/getPostList", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getPostlList(@RequestParam("perpage") Integer perpage,
                               @RequestParam("page") Integer page,
                               HttpServletRequest req, HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        TopicListResp topicListResp = new TopicListResp();
        topicListResp.setList(topicService.getTopics(perpage, page -1));
        topicListResp.setTotalcount(topicService.getTopicsCount(null));
        String response = new Gson().toJson(topicListResp);
        return response;
    }

    /**
     * Description: Get topic list by userId
     * @httpMethod get
     * @mediaType text
     * @param userid
     * @param perpage
     * @param page
     */
    @RequestMapping(value = "/getPostListByUserId", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getPostlListByUserId(@RequestParam("userid") Integer userid,
                                       @RequestParam("perpage") Integer perpage,
                                       @RequestParam("page") Integer page,
                                       HttpServletRequest req, HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        TopicListResp topicListResp = new TopicListResp();
        topicListResp.setList(topicService.getTopicsByUserId(userid, perpage, page -1));
        topicListResp.setTotalcount(topicService.getTopicsCount(userid));
        String response = new Gson().toJson(topicListResp);
        return response;
    }

    @RequestMapping(value = "/getPostListByTopicId", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getPostlListByTopicId(@RequestParam("topicid") Integer topicid,
                                        @RequestParam("perpage") Integer perpage,
                                        @RequestParam("page") Integer page,
                                        HttpServletRequest req, HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        TopicCommentsResp topicCommentsResp = new TopicCommentsResp();
        topicCommentsResp.setTopic(topicService.getTopic(topicid));
        topicCommentsResp.setComments(topicService.getComments(topicid, perpage, page -1));
        topicCommentsResp.setCommentsCount(topicService.getCommentsCount(topicid));
        String response = new Gson().toJson(topicCommentsResp);
        return response;
    }

    /**
     * Description: Get topic details by topicId
     * @httpMethod get
     * @mediaType text
     * @param topicid
     */
    @RequestMapping(value = "/getPostEditDetail", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getPostEditDetail(@RequestParam("topicid") Integer topicid,
                                    HttpServletRequest req, HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        String response = new Gson().toJson(topicService.getTopic(topicid));
        return response;
    }

    /**
     * Description: Add comments to a topic
     * @httpMethod post
     * @mediaType json
     * @param body
     */
    @RequestMapping(value = "/addComments", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String addComments(@RequestBody String body,
                              HttpServletRequest req, HttpServletResponse resp) {
        LOGGER.info("hello,im log4j!");
        System.out.println("I‘m here!");
        Comments comments = new Gson().fromJson(body, Comments.class);
        comments.setCreatetime(getDate());
        comments.setLastupdate(comments.getCreatetime());
        comments.setUsername(userService.getUserName(comments.getUserid()));
        ActionResp actionResp = new ActionResp();
        if (topicService.addComments(comments)) {
            actionResp.setMessage("success");
            actionResp.setStatus(0);
        } else {
            actionResp.setMessage("failed");
            actionResp.setStatus(1);
        }
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        String response = new Gson().toJson(actionResp);
        return response;
    }


    /**
     * Description: Delete comments by commentId
     * @httpMethod get
     * @mediaType text
     * @param commentid
     */
    @RequestMapping(value = "/deleteComments", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String deleteComments(@RequestParam("commentid") Integer commentid,
                                 HttpServletRequest req, HttpServletResponse resp) {
        LOGGER.info("hello,im log4j!");
        ActionResp actionResp = new ActionResp();
        topicService.deleteCommentsById(commentid);
        actionResp.setMessage("success");
        actionResp.setStatus(0);
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        String response = new Gson().toJson(actionResp);
        return response;
    }

    /**
     * Description: Update a topic
     * @httpMethod post
     * @mediaType json
     * @param body
     */
    @RequestMapping(value = "/updatePost", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String updatePost(@RequestBody String body,
                             HttpServletRequest req, HttpServletResponse resp) {
        LOGGER.info("hello,im log4j!");
        System.out.println("I‘m here!");
        Topic topic = new Gson().fromJson(body, Topic.class);
        topic.setLastupdate(getDate());
        ActionResp actionResp = new ActionResp();
        if (topicService.updateTopic(topic)) {
            actionResp.setMessage("success");
            actionResp.setStatus(0);
        } else {
            actionResp.setMessage("failed");
            actionResp.setStatus(1);
        }
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        String response = new Gson().toJson(actionResp);
        return response;
    }

    /**
     * Description: Delete a topic by topicId
     * @httpMethod get
     * @mediaType text
     * @param topicid
     */
    @RequestMapping(value = "/deletePost", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String updatePost(@RequestParam("topicid") Integer topicid,
                             HttpServletRequest req, HttpServletResponse resp) {
        LOGGER.info("hello,im log4j!");
        System.out.println("I‘m here!");
        ActionResp actionResp = new ActionResp();
        topicService.deleteTopic(topicid);
        topicService.deleteComments(topicid);
        actionResp.setMessage("success");
        actionResp.setStatus(0);
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        String response = new Gson().toJson(actionResp);
        return response;
    }

    public String generateUploadId(Integer userid, String filename) {
        StringBuffer buffer = new StringBuffer(userid.toString());
        buffer.append("_");
        buffer.append(filename);
        buffer.append("_");
        buffer.append(System.currentTimeMillis());
        return buffer.toString();
    }

    public String generateFileId(Integer userid) {
        StringBuffer buffer = new StringBuffer(userid.toString());
        buffer.append("_");
        buffer.append(System.currentTimeMillis());
        return buffer.toString();
    }

    private String getDate() {
        SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Long time=(System.currentTimeMillis());
        String date = format.format(time);
        return date;
    }

    public enum Status {
        SAVED("saved", 1), INREVIEW("inreview", 2), REJECTED("rejected", 3), PUBLISHED("published", 4);
        private String name;
        private int index;

        private Status(String name, int index) {
            this.name = name;
            this.index = index;
        }

        public static String getName(int index) {
            for (Status s : Status.values()) {
                if (s.getIndex() == index) {
                    return s.name;
                }
            }
            return null;
        }

        public static Integer getIndex(String name) {
            for (Status s : Status.values()) {
                if (s.getName().equals(name)) {
                    return s.index;
                }
            }
            return null;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getIndex() {
            return index;
        }

        public void setIndex(int index) {
            this.index = index;
        }
    }
}
