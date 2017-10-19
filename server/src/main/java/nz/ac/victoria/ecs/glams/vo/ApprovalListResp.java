package nz.ac.victoria.ecs.glams.vo;

import java.util.Calendar;
import java.util.List;

/**
 * Created by limengheng on 04/10/17.
 *
 */

import static java.util.Calendar.DAY_OF_MONTH;
import static java.util.Calendar.MONTH;
import static java.util.Calendar.YEAR;
public class ApprovalListResp {


    private List<FileDetails> list;
    private Integer totalcount;

    public List<FileDetails> getList() {
        return list;
    }

    public Integer getTotalcount() {
        return totalcount;
    }

    public void setList(List<FileDetails> list) {
        this.list = list;
    }

    public void setTotalcount(Integer totalcount) {
        this.totalcount = totalcount;
    }

    public static void main(String[]args){
        Calendar today = Calendar.getInstance();
        Integer day = today.get(DAY_OF_MONTH)-1;
        Integer month = today.get(MONTH);
        Integer year = today.get(YEAR) - 2005;

        System.out.print("day:"+day+" month:"+month+" year:"+year);

    }
}
