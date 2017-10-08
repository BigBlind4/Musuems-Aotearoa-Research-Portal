package nz.ac.victoria.ecs.glams.vo;

/**
 * Created by limengheng on 23/09/17.
 */
public class UserFile {
    private Integer userid;
    private String uploadid;
    private String fileid;
    private String filename;
    private String filetype;
    private String size;
    private String content;
    private String resource;

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

    public String getFileid() {
        return fileid;
    }

    public void setFileid(String fileid) {
        this.fileid = fileid;
    }

    public String getUploadid() {
        return uploadid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUploadid(String uploadid) {
        this.uploadid = uploadid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public void setFiletype(String filetype) {
        this.filetype = filetype;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getFilename() {
        return filename;
    }

    public String getFiletype() {
        return filetype;
    }

    public String getSize() {
        return size;
    }

    public String getContent() {
        return content;
    }

}
