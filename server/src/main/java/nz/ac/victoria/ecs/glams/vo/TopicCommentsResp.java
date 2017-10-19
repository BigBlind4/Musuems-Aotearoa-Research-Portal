package nz.ac.victoria.ecs.glams.vo;

import java.util.List;

/**
 * Created by lijianzhou on 04/10/17.
 */
public class TopicCommentsResp {
    private Topic topic;
    private List<Comments> comments;
    private Integer commentsCount;

    public Integer getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(Integer commentsCount) {
        this.commentsCount = commentsCount;
    }

    public Topic getTopic() {
        return topic;
    }

    public List<Comments> getComments() {
        return comments;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public void setComments(List<Comments> comments) {
        this.comments = comments;
    }
}
