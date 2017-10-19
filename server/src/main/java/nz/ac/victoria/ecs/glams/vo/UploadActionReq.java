package nz.ac.victoria.ecs.glams.vo;

/**
 * Created by lijianzhou on 12/10/17.
 */
public class UploadActionReq {
    private String uploadid;
    private Integer userid;
    private String comment;
    private String action;


    public String getUploadid() {
        return uploadid;
    }

    public Integer getUserid() {
        return userid;
    }

    public String getComment() {
        return comment;
    }

    public String getAction() {
        return action;
    }


    public void setUploadid(String uploadid) {
        this.uploadid = uploadid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
