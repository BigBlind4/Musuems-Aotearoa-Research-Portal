package nz.ac.victoria.ecs.glams.service;

import nz.ac.victoria.ecs.glams.vo.Comments;
import nz.ac.victoria.ecs.glams.vo.Topic;
import nz.ac.victoria.ecs.glams.vo.User;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by limengheng on 06/09/17.
 */

@Service
public class TopicService {
    private static final List<Topic> TOPICS = new ArrayList<Topic>();
    private static final List<Comments> COMMENTS = new ArrayList<Comments>();

    public List<Topic> getTopics(Integer perpage, Integer page) {
        List<Topic> list = new ArrayList<Topic>();
        for (int i = perpage * (page + 1) - perpage + 1; i < perpage * (page + 1) + 1; i++) {
            if (i <= TOPICS.size()) {
                list.add(TOPICS.get(i - 1));
            }
        }
        Collections.sort(list, new Comparator<Topic>() {
            public int compare(Topic arg0, Topic arg1) {
                return arg0.getLastupdate().compareTo(arg1.getLastupdate());
            }
        });
        return list;
    }

    public Integer getTopicsCount(Integer userid) {
        List<Topic> list = new ArrayList<Topic>();
        if (userid == null) {
            return TOPICS.size();
        } else {
            for (Topic t : TOPICS) {
                if (t.getUserid() == userid) {
                    list.add(t);
                }
            }
            return list.size();
        }
    }

    public Integer getCommentsCount(Integer topicid) {
        List<Comments> list = new ArrayList<Comments>();
        if (topicid == null) {
            return COMMENTS.size();
        } else {
            for (Comments t : COMMENTS) {
                if (t.getTopicid() == topicid) {
                    list.add(t);
                }
            }
            return list.size();
        }
    }

    public boolean deleteTopic(Integer topicid) {
        Iterator<Topic> it = TOPICS.iterator();
        while (it.hasNext()) {
            Topic t = it.next();
            if (topicid == t.getTopicid()) {
                it.remove();
            }
        }
        return true;
    }

    public boolean updateTopic(Topic topic){
        for (Topic t : TOPICS) {
            if (t.getTopicid() == topic.getTopicid()) {
                t.setTitle(topic.getTitle());
                t.setTags(topic.getTags());
                t.setDetails(topic.getDetails());
            }
        }
        return true;
    }

    public boolean deleteComments(Integer topicid) {
        Iterator<Comments> it = COMMENTS.iterator();
        while (it.hasNext()) {
            Comments t = it.next();
            if (topicid == t.getTopicid()) {
                it.remove();
            }
        }
        return true;
    }

    public boolean deleteCommentsById(Integer commentid) {
        Iterator<Comments> it = COMMENTS.iterator();
        while (it.hasNext()) {
            Comments t = it.next();
            if (commentid == t.getCommentid()) {
                it.remove();
            }
        }
        return true;
    }

    public Topic getTopic(Integer topicid) {
        Topic topic = null;
        for (Topic t : TOPICS) {
            if (t.getTopicid() == topicid) {
                topic = t;
            }
        }
        return topic;
    }

    public List<Topic> getTopicsByUserId(Integer userid, Integer perpage, Integer page) {
        List<Topic> allList = new ArrayList<Topic>();
        List<Topic> subList = new ArrayList<Topic>();
        for (Topic t : TOPICS) {
            if (t.getUserid() == userid) {
                allList.add(t);
            }
        }
        Collections.sort(allList, new Comparator<Topic>() {
            public int compare(Topic arg0, Topic arg1) {
                return arg0.getLastupdate().compareTo(arg1.getLastupdate());
            }
        });
        for (int i = perpage * (page + 1) - perpage + 1; i < perpage * (page + 1) + 1; i++) {
            if (i <= allList.size()) {

                subList.add(allList.get(i - 1));
            }
        }
        return subList;
    }

    public List<Comments> getComments(Integer topicid, Integer perpage, Integer page) {
        List<Comments> allList = new ArrayList<Comments>();
        List<Comments> subList = new ArrayList<Comments>();
        for (Comments c : COMMENTS) {
            if (c.getTopicid() == topicid) {
                allList.add(c);
            }
        }
        Collections.sort(allList, new Comparator<Comments>() {
            public int compare(Comments arg0, Comments arg1) {
                return arg0.getLastupdate().compareTo(arg1.getLastupdate());
            }
        });
        for (int i = perpage * (page + 1) - perpage + 1; i < perpage * (page + 1) + 1; i++) {
            if (i <= allList.size()) {

                subList.add(allList.get(i - 1));
            }
        }
        return subList;
    }

    public boolean addComments(Comments comments) {
        comments.setCommentid(COMMENTS.size() + 1);
        COMMENTS.add(comments);
        return true;
    }

    public boolean addTopics(Topic topic) {
        topic.setTopicid(TOPICS.size() + 1);
        TOPICS.add(topic);
        return true;
    }
}
