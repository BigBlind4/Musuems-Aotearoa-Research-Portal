package nz.ac.victoria.ecs.glams.vo;

/**
 * Created by limengheng on 06/09/17.
 */
public class UploadFileResp {
    private int userid;
    private String uploadid;
    private String fileid;
    private int status;
    private String message;

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public String getUploadid() {
        return uploadid;
    }

    public String getFileid() {
        return fileid;
    }

    public void setUploadid(String uploadid) {
        this.uploadid = uploadid;
    }

    public void setFileid(String fileid) {
        this.fileid = fileid;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
