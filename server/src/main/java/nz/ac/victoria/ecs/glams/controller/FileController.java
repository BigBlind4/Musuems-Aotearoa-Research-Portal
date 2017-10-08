package nz.ac.victoria.ecs.glams.controller;

//import com.google.gson.Gson;

import com.google.gson.Gson;
import nz.ac.victoria.ecs.glams.service.AuthenticationService;
import nz.ac.victoria.ecs.glams.service.FileStoreService;
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
import java.util.List;

/**
 * Created by limengheng on 09/08/17.
 */
@RestController
@RequestMapping(value = "/file")
public class FileController {
    @Autowired
    private AuthenticationService aService;
    @Autowired
    private FileStoreService fsService;
    private static final Logger LOGGER = LogManager.getLogger();

    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String uploadFile(@RequestBody String body,
                             HttpServletRequest req, HttpServletResponse resp) {
        LOGGER.info("hello,im log4j!");
        System.out.println("I‘m here!");
        UserFile uf = new Gson().fromJson(body, UserFile.class);
        UploadFileResp uploadResp = new UploadFileResp();
        if (!uf.getContent().isEmpty()) {
            try {
                uploadResp.setUserid(uf.getUserid());
                String uploadId = uf.getUploadid();
                if(uf.getUploadid()==null || uf.getUploadid().isEmpty()){
                    uploadId = generateUploadId(uf.getUserid(), uf.getFilename());
                    uploadResp.setUploadid(uploadId);
                }
                String fileId = generateFileId(uf.getUserid());
                uploadResp.setFileid(fileId);

                String nf = uf.getContent().split(",")[1];
                byte[] data = Base64.decodeBase64(nf.getBytes());

                // Creating the directory to store file
                String rootPath = System.getProperty("catalina.home");
                File dir = new File(rootPath + File.separator + "webapps/ROOT/uploadFiles" + File.separator + uf.getUserid());
                if (!dir.exists())
                    dir.mkdirs();

                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath()
                        + File.separator + uf.getFilename());
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));
                stream.write(data);
                stream.close();

                uf.setUploadid(uploadId);
                uf.setFileid(fileId);
                uf.setResource("http://10.140.37.26:8089/uploadFiles/" + uf.getUserid() + File.separator + uf.getFilename());
                fsService.addFile(uf);

                uploadResp.setStatus(1);
                uploadResp.setMessage("You have successfully uploaded the file.");
            } catch (Exception e) {
                System.out.println(e.getMessage());
                uploadResp.setStatus(0);
                uploadResp.setMessage("File upload is not successful, please try again");
            }
        } else {
            uploadResp.setStatus(0);
            uploadResp.setMessage("You failed to upload " + uf.getFilename() + " because the file was empty.");
        }
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        String response = new Gson().toJson(uploadResp);
        return response;
    }

    @RequestMapping(value = "/uploadDetails", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String uploadDetails(@RequestBody String body,
                                HttpServletRequest req, HttpServletResponse resp) {
        System.out.println("I‘m here!");
        FileDetails fd = new Gson().fromJson(body, FileDetails.class);
        ActionResp actionResp = new ActionResp();
        Boolean rs = false;
        actionResp.setStatus(0);
        actionResp.setMessage("failed");
        if (fd.getUserid() != null) {
            rs = fsService.addDetail(fd);
            if (rs) {
                actionResp.setStatus(1);
                actionResp.setMessage("You have successfully uploaded the material.");
            }
        }

        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        String response = new Gson().toJson(actionResp);
        return response;
    }

    @RequestMapping(value = "/updateDetails", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String updateDetails(@RequestBody String body,
                                HttpServletRequest req, HttpServletResponse resp) {
        System.out.println("I‘m here!");
        FileDetails fd = new Gson().fromJson(body, FileDetails.class);
        ActionResp actionResp = new ActionResp();
        Boolean rs = false;
        actionResp.setStatus(0);
        actionResp.setMessage("failed");
        if (fd.getUserid() != null) {
            rs = fsService.updateDetails(fd);
            if (rs) {
                actionResp.setStatus(1);
                actionResp.setMessage("You have successfully updated the material.");
            }
        }

        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        String response = new Gson().toJson(actionResp);
        return response;
    }

    @RequestMapping(value = "/getUploadDetailsList", method = RequestMethod.GET)
    public String details(@RequestParam("userid") Integer userid,
                          HttpServletRequest req, HttpServletResponse resp) {
        System.out.println("I‘m here!");
        List<FileDetails> list = fsService.getDetailsList(userid);
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        String response = new Gson().toJson(list);
        return response;
    }

    @RequestMapping(value = "/getUploadDetails", method = RequestMethod.GET)
    public String details(@RequestParam("uploadid") String uploadid,
                          @RequestParam("userid") Integer userid,
                          HttpServletRequest req, HttpServletResponse resp) {
        System.out.println("I‘m here!");

        Boolean rs = false;
        FileDetails fileDetails = fsService.getDetails(userid, uploadid);
        UserFile userFile = fsService.getFile(userid, fileDetails.getFileid());

        DetailsResp detailsResp = new DetailsResp();
        detailsResp.setUserid(fileDetails.getUserid());
        detailsResp.setResource(userFile.getResource());
        detailsResp.setFileid(fileDetails.getFileid());
        detailsResp.setUploadid(fileDetails.getUploadid());
        detailsResp.setTitle(fileDetails.getTitle());
        detailsResp.setAuthor(fileDetails.getAuthor());
        detailsResp.setCategory(fileDetails.getCategory());
        detailsResp.setDescription(fileDetails.getDescription());
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        String response = new Gson().toJson(detailsResp);
        return response;
    }

    @RequestMapping(value = "/removeFile", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String removeFile(@RequestBody String body,
                             HttpServletRequest req, HttpServletResponse resp) {
        System.out.println("I‘m here!");
        UserFile uf = new Gson().fromJson(body, UserFile.class);
        ActionResp actionResp = new ActionResp();
        Boolean rs = false;
        if (uf.getUserid() != null) {
            rs = fsService.removeFile(uf.getUserid(), uf.getFileid());
            if (rs) {
                actionResp.setStatus(1);
                actionResp.setMessage("success");
            } else {
                actionResp.setStatus(0);
                actionResp.setMessage("failed to remove");
            }
        }

        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        String response = new Gson().toJson(actionResp);
        return response;
    }

    @RequestMapping(value = "/removeUpload", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public String removeUpload(@RequestBody String body,
                               HttpServletRequest req, HttpServletResponse resp) {
        System.out.println("I‘m here!");
        UserFile uf = new Gson().fromJson(body, UserFile.class);
        ActionResp actionResp = new ActionResp();
        List<FileDetails> list = null;
        Boolean rs = false;
        if (uf.getUserid() != null) {
            list = fsService.removeDetail(uf.getUserid(), uf.getUploadid());
        }
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-method", "POST,GET,OPTIONS");
        String response = new Gson().toJson(list);
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
}
