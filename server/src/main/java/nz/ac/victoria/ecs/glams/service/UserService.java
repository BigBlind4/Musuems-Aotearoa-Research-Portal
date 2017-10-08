package nz.ac.victoria.ecs.glams.service;

import nz.ac.victoria.ecs.glams.vo.User;
import nz.ac.victoria.ecs.glams.vo.UserProfiles;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipal;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by limengheng on 06/09/17.
 */

@Service
public class UserService {
    private static final HashMap<String, Integer> UsersRolesEmail = new HashMap<String, Integer>();
    private static final HashMap<String, Integer> UsersRolesNames = new HashMap<String, Integer>();
    private static final HashMap<String, Integer> UsersIdsEmail = new HashMap<String, Integer>();
    private static final HashMap<String, Integer> UsersIdsNames = new HashMap<String, Integer>();



    static {
        UsersRolesEmail.put("admin@gmail.com", 1);
        UsersRolesEmail.put("jack123@gmail.com", 2);

        UsersRolesNames.put("admin", 1);
        UsersRolesNames.put("jack", 2);

        UsersIdsEmail.put("admin", 1);
        UsersIdsEmail.put("jack", 2);

        UsersIdsNames.put("admin", 1);
        UsersIdsNames.put("jack", 2);

    }


    public Integer getRoles(User user) {
        if (user != null) {
            if (null != user.getEmail() && !"".equals(user.getEmail())) {
                return UsersRolesEmail.get(user.getEmail());
            }

            if (null != user.getUsername() && !"".equals(user.getUsername())) {
                return UsersRolesNames.get(user.getUsername());
            }
        }
        return null;
    }

    public String getUserName(Integer userid){
        String username = null;
        for (Map.Entry<String,Integer> entry : UsersIdsNames.entrySet()) {
            if(entry.getValue() == userid){
                username = entry.getKey();
            }
        }
        return username;
    }

    public Integer getUserId(User user) {
        if (user != null) {
            if (null != user.getEmail() && !"".equals(user.getEmail())) {
                return UsersIdsEmail.get(user.getEmail());
            }

            if (null != user.getUsername() && !"".equals(user.getUsername())) {
                return UsersIdsNames.get(user.getUsername());
            }
        }
        return null;
    }
}
