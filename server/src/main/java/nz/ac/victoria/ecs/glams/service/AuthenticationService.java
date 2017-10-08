package nz.ac.victoria.ecs.glams.service;

import nz.ac.victoria.ecs.glams.vo.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;

/**
 * Created by limengheng on 06/09/17.
 */

@Service
public class AuthenticationService {
    private static final HashMap<String, String> UsersEmails = new HashMap<String, String>();
    private static final HashMap<String, String> UsersNames = new HashMap<String, String>();

    static {
        UsersEmails.put("admin@gmail.com", "admin123");
        UsersEmails.put("jack@gmail.com", "jack123");

        UsersNames.put("admin", "admin123");
        UsersNames.put("jack", "jack123");

    }

    public boolean authenticate(User user) {
        if (user != null) {
            if (null != user.getEmail() && !user.getEmail().isEmpty()) {
                String pass = UsersEmails.get(user.getEmail().toLowerCase());
                if (user.getPassword().equals(pass)) {
                    return true;
                }
            }

            if (null != user.getUsername() && !user.getUsername().isEmpty()) {
                String pass = UsersNames.get(user.getUsername().toLowerCase());
                if (user.getPassword().equals(pass)) {
                    return true;
                }
            }
        }
        return false;
    }
}
