package nz.ac.victoria.ecs.glams.vo;

/**
 * Created by limengheng on 12/10/17.
 */
public class UpdatePasswordReq {
    private int userid;
    private String password;
    private String newpassword;

    public int getUserid() {
        return userid;
    }

    public String getPassword() {
        return password;
    }

    public String getNewpassword() {
        return newpassword;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setNewpassword(String newpassword) {
        this.newpassword = newpassword;
    }
}
