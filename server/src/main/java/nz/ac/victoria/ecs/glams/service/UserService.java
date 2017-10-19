package nz.ac.victoria.ecs.glams.service;

import nz.ac.victoria.ecs.glams.vo.UpdatePasswordReq;
import nz.ac.victoria.ecs.glams.vo.User;
import nz.ac.victoria.ecs.glams.vo.UserProfiles;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipal;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by limengheng on 06/09/17.
 * Services concerning users and user profiles
 */

@Service
public class UserService {
    private static final HashMap<Integer, User> UsersProfile = new HashMap<Integer, User>();


    static {
        User user1 = new User();
        user1.setUserid(1);
        user1.setUsername("admin");
        user1.setEmail("admin@gmail.com");
        user1.setFirstname("admin");
        user1.setLastname("wang");
        user1.setPassword("admin123");
        user1.setRole(1);
        UsersProfile.put(1, user1);

        User user2 = new User();
        user2.setUserid(2);
        user2.setUsername("jack");
        user2.setEmail("jack@gmail.com");
        user2.setFirstname("jack");
        user2.setLastname("cheng");
        user2.setPassword("jack123");
        user2.setRole(2);
        UsersProfile.put(2, user2);

    }

    public User getProfile(Integer userid) {
        User origin = UsersProfile.get(userid);
        User user = new User();
        user.setUsername(origin.getUsername());
        user.setEmail(origin.getEmail());
        user.setFirstname(origin.getFirstname());
        user.setLastname(origin.getLastname());
        return user;
    }

    public boolean updateProfile(User user) {
        User origin = UsersProfile.get(user.getUserid());
        origin.setUsername(user.getUsername());
        origin.setEmail(user.getEmail());
        origin.setFirstname(user.getFirstname());
        origin.setLastname(user.getLastname());
        return true;
    }

    public Integer getRolesByEmailAndNames(User user) {
        Integer role = null;
        for (Map.Entry<Integer, User> entry : UsersProfile.entrySet()) {
            if (null != user.getUsername() && !user.getUsername().isEmpty() && user.getUsername().equals(entry.getValue().getUsername())) {
                role = entry.getValue().getRole();
                user.setUserid(entry.getValue().getUserid());
                break;
            } else if (null != user.getEmail() && !user.getEmail().isEmpty() && user.getEmail().equals(entry.getValue().getEmail())) {
                role = entry.getValue().getRole();
                break;
            }
        }
        return role;
    }

    public String getUserName(Integer userid) {
        String username = null;
        for (Map.Entry<Integer, User> entry : UsersProfile.entrySet()) {
            if (entry.getKey() == userid) {
                username = entry.getValue().getUsername();
            }
        }
        return username;
    }

    public Integer getUserId(User user) {
        Integer userid = null;
        if (user != null) {
            for (Map.Entry<Integer, User> entry : UsersProfile.entrySet()) {
                if (null != user.getEmail() && !user.getEmail().isEmpty() && user.getUsername().equals(entry.getValue().getUsername())) {
                    userid = entry.getKey();
                    break;
                } else if (null != user.getEmail() && !user.getEmail().isEmpty() && user.getEmail().equals(entry.getValue().getEmail())) {
                    userid = entry.getKey();
                    break;
                }
            }
        }
        return userid;
    }

    public boolean authenticate(User user) {
        Boolean flag = false;
        for (Map.Entry<Integer, User> entry : UsersProfile.entrySet()) {
            if (null != user.getUsername() && !user.getUsername().isEmpty() && user.getUsername().equals(entry.getValue().getUsername()) && user.getPassword().equals(entry.getValue().getPassword())) {
                user.setRole(entry.getValue().getRole());
                user.setUserid(entry.getValue().getUserid());
                flag = true;
                break;
            } else if (null != user.getEmail() && !user.getEmail().isEmpty() && user.getEmail().equals(entry.getValue().getEmail()) && user.getPassword().equals(entry.getValue().getPassword())) {
                user.setRole(entry.getValue().getRole());
                user.setUserid(entry.getValue().getUserid());
                flag = true;
                break;
            }
        }
        return flag;
    }

    public boolean updatePassword(Integer userid, String password, String newPassword) {
        User user = UsersProfile.get(userid);
        if (password.equals(user.getPassword())) {
            user.setPassword(newPassword);
            return true;
        }
        return false;
    }

}
