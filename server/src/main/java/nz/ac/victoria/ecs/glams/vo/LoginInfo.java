package nz.ac.victoria.ecs.glams.vo;

/**
 * Created by limengheng on 06/09/17.
 * stores login status and related user
 */
public class LoginInfo {
    private User user;
    private int status;

    public void setUser(User user) {
        this.user = user;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public int getStatus() {
        return status;
    }
}
