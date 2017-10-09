package nz.ac.victoria.ecs.glams.vo;

/**
 * Created by limengheng on 06/09/17.
 * Stores information about a message and its status  
 * NEED review by Zedd
 */
public class ActionResp {
    private Integer status;
    private String message;


    public String getMessage() {
        return message;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getStatus() {
        return status;
    }

}
