package nz.ac.victoria.ecs.glams.vo;

/**
 * Created by limengheng on 02/10/17.
 */
public class Comments {
    private int commentid;
    private int topicid;
    private int userid;
    private String username;
    private String comments;
    private String createtime;
    private String lastupdate;
    private Boolean issameuser;

    public Boolean getIssameuser() {
        return issameuser;
    }

    public void setIssameuser(Boolean issameuser) {
        this.issameuser = issameuser;
    }

    public int getCommentid() {
        return commentid;
    }

    public void setCommentid(int commentid) {
        this.commentid = commentid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }

    public void setLastupdate(String lastupdate) {
        this.lastupdate = lastupdate;
    }

    public String getCreatetime() {
        return createtime;
    }

    public String getLastupdate() {
        return lastupdate;
    }

    public int getTopicid() {
        return topicid;
    }

    public int getUserid() {
        return userid;
    }

    public void setTopicid(int topicid) {
        this.topicid = topicid;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

}
