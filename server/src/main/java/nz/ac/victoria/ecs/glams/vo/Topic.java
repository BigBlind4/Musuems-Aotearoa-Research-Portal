package nz.ac.victoria.ecs.glams.vo;

/**
 * Created by limengheng on 02/10/17.
 * Represents a topic on the message board.
 */
public class Topic {
    private int topicid;
    private String title;
    private int userid;
    private String username;
    private String details;
    private String status;
    private String tags;
    private Integer CommentsCount;
    private int statusindex;
    private String createtime;
    private String lastupdate;

    public void setCommentsCount(Integer commentsCount) {
        CommentsCount = commentsCount;
    }

    public Integer getCommentsCount() {
        return CommentsCount;
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

    public void setStatus(String status) {
        this.status = status;
    }

    public void setStatusindex(int statusindex) {
        this.statusindex = statusindex;
    }

    public String getStatus() {
        return status;
    }

    public int getStatusindex() {
        return statusindex;
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

    public String getTitle() {
        return title;
    }

    public int getUserid() {
        return userid;
    }

    public String getDetails() {
        return details;
    }

    public String getTags() {
        return tags;
    }

    public void setTopicid(int topicid) {
        this.topicid = topicid;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }
}
