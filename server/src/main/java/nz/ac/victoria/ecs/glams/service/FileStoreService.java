package nz.ac.victoria.ecs.glams.service;

import nz.ac.victoria.ecs.glams.vo.FileDetails;
import nz.ac.victoria.ecs.glams.vo.UserFile;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

/**
 * Created by limengheng on 06/09/17.
 */

@Service
public class FileStoreService {
    private static final HashMap<Integer, List<UserFile>> UserFiles = new HashMap<Integer, List<UserFile>>();
    private static final HashMap<Integer, List<FileDetails>> UserFileDetails = new HashMap<Integer, List<FileDetails>>();

    public boolean addFile(UserFile file) {
        List<UserFile> filesList = UserFiles.get(file.getUserid());
        if (filesList != null && !filesList.isEmpty()) {
            UserFiles.get(file.getUserid()).add(file);
        } else {
            List<UserFile> l = new ArrayList<UserFile>();
            l.add(file);
            UserFiles.put(file.getUserid(), l);
        }
        return true;
    }

    public List<UserFile> getFilesList(Integer userId) {
        return UserFiles.get(userId);
    }

    public List<FileDetails> getDetailsList(Integer userId) {
        return UserFileDetails.get(userId);
    }

    public UserFile getFile(Integer userId, String fileId) {
        List<UserFile> l = UserFiles.get(userId);
        UserFile userFile = null;
        for (UserFile uf : l) {
            if (fileId.equals(uf.getFileid())) {
                userFile = uf;
                break;
            }
        }
        return userFile;
    }

    public boolean addDetail(FileDetails details) {
        List<FileDetails> filesDetails = UserFileDetails.get(details.getUserid());
        if (filesDetails != null && !filesDetails.isEmpty()) {
            UserFileDetails.get(details.getUserid()).add(details);
        } else {
            List<FileDetails> l = new ArrayList<FileDetails>();
            l.add(details);
            UserFileDetails.put(details.getUserid(), l);
        }
        return true;
    }

    public FileDetails getDetails(Integer userId, String uploadId) {
        List<FileDetails> l = UserFileDetails.get(userId);
        FileDetails fileDetails = null;
        for (FileDetails fd : l) {
            if (fd.getUploadid().equals(uploadId)) {
                fileDetails = fd;
                break;
            }
        }
        return fileDetails;
    }

    public boolean removeFile(Integer userId, String fileId) {
        List<UserFile> l = UserFiles.get(userId);
        Iterator<UserFile> it = l.iterator();
        while (it.hasNext()) {
            UserFile uf = it.next();
            if (fileId.equals(uf.getFileid())) {
                it.remove();
            }
        }
        UserFiles.put(userId, l);
        return true;
    }

    public List<FileDetails> removeDetail(Integer userId, String uploadId) {
        List<FileDetails> l = UserFileDetails.get(userId);
        Iterator<FileDetails> it = l.iterator();
        while (it.hasNext()) {
            FileDetails uf = it.next();
            if (uploadId.equals(uf.getUploadid())) {
                it.remove();
            }
        }
        UserFileDetails.put(userId, l);
        return UserFileDetails.get(userId);
    }

    public Boolean updateDetails(FileDetails details) {
        List<FileDetails> l = UserFileDetails.get(details.getUserid());
        Iterator<FileDetails> it = l.iterator();
        while (it.hasNext()) {
            FileDetails uf = it.next();
            if (details.getUploadid().equals(uf.getUploadid())) {
                if (details.getUserid() != null) {
                    uf.setUserid(details.getUserid());
                }
                if (details.getFileid() != null && !details.getFileid().isEmpty()) {
                    uf.setFileid(details.getFileid());
                }
                if (details.getUploadid() != null && !details.getUploadid().isEmpty()) {

                    uf.setUploadid(details.getUploadid());
                }
                if (details.getTitle() != null && !details.getTitle().isEmpty()) {

                    uf.setTitle(details.getTitle());
                }
                if (details.getAuthor() != null && !details.getAuthor().isEmpty()) {

                    uf.setAuthor(details.getAuthor());
                }
                if (details.getDescription() != null && !details.getDescription().isEmpty()) {

                    uf.setDescription(details.getDescription());
                }
            }
        }
        return true;
    }


    public static void main(String[] args) {
        List<Integer> list = new ArrayList<Integer>();
        list.add(0, 1);
        list.add(1, 2);
        list.add(2, 3);

        Iterator<Integer> it = list.iterator();

        while (it.hasNext()) {
            Integer x = it.next();
            if (x == 2) {
                it.remove();
            }
        }
        System.out.println(list);
    }
}
