package nz.ac.victoria.ecs.glams.vo;

/**
 * Created by lijianzhou on 06/09/17.
 */
public class LoginResp {
    private int userid;
    private int status;
    private int role;


    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public int getStatus() {
        return status;
    }

    public int getRole() {
        return role;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void setRole(int role) {
        this.role = role;
    }
}
