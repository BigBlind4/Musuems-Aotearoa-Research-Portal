package nz.ac.victoria.ecs.glams.vo;

/**
 * Created by lijianzhou on 24/09/17.
 */
public class DetailsResp extends FileDetails {
    private String resource;

    private String comment;

    private String username;

    public String getUsername() {
        return username;
    }


    public void setUsername(String username) {
        this.username = username;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }
}
