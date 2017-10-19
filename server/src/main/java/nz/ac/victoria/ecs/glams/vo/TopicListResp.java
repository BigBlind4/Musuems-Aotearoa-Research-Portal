package nz.ac.victoria.ecs.glams.vo;

import java.util.List;

/**
 * Created by lijianzhou on 04/10/17.
 */
public class TopicListResp {
    private List<Topic> list;
    private Integer totalcount;

    public List<Topic> getList() {
        return list;
    }

    public Integer getTotalcount() {
        return totalcount;
    }

    public void setList(List<Topic> list) {
        this.list = list;
    }

    public void setTotalcount(Integer totalcount) {
        this.totalcount = totalcount;
    }
}
