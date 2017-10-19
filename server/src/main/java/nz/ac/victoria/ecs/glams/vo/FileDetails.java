package nz.ac.victoria.ecs.glams.vo;

/**
 * Created by limengheng on 24/09/17.
 */
public class FileDetails {
    private Integer userid;
//    private String username;
    private String fileid;
    private String uploadid;
    private String title;
    private String author;
    private String description;
    private String category;
    private String uploadstatus;
    private String createtime;
    private String lastupdate;

//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }

    public String getCreatetime() {
        return createtime;
    }

    public String getLastupdate() {
        return lastupdate;
    }

    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }

    public void setLastupdate(String lastupdate) {
        this.lastupdate = lastupdate;
    }

    public String getUploadstatus() {
        return uploadstatus;
    }

    public void setUploadstatus(String uploadstatus) {
        this.uploadstatus = uploadstatus;
    }

    public String getUploadid() {
        return uploadid;
    }

    public void setUploadid(String uploadid) {
        this.uploadid = uploadid;
    }

    public String getFileid() {
        return fileid;
    }

    public void setFileid(String fileid) {
        this.fileid = fileid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
