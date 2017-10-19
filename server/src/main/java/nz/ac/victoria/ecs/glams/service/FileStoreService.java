package nz.ac.victoria.ecs.glams.service;

import nz.ac.victoria.ecs.glams.vo.FileDetails;
import nz.ac.victoria.ecs.glams.vo.Topic;
import nz.ac.victoria.ecs.glams.vo.UploadActionReq;
import nz.ac.victoria.ecs.glams.vo.UserFile;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by lijianzhou on 06/09/17.
 * Services concerning files and file details (add, delete, etc.)
 */

@Service
public class FileStoreService {
    private static final HashMap<Integer, List<UserFile>> UserFiles = new HashMap<Integer, List<UserFile>>();
    private static final HashMap<Integer, List<FileDetails>> UserFileDetails = new HashMap<Integer, List<FileDetails>>();
    private static final HashMap<String, UploadActionReq> ApproveComments = new HashMap<String, UploadActionReq>();


    public String getCommentByUploadId(String uploadid) {
        if (ApproveComments.size() > 0) {
            if (ApproveComments.get(uploadid) != null) {
                return ApproveComments.get(uploadid).getComment();
            }
        }
        return "";
    }

    public boolean addApproveComments(UploadActionReq ua) {
        ApproveComments.put(ua.getUploadid(), ua);
        return true;
    }

    public boolean updateStatus(UploadActionReq ua) {
        List<FileDetails> list = UserFileDetails.get(ua.getUserid());
        for (FileDetails fileDetails : list) {
            if (ua.getUploadid().equals(fileDetails.getUploadid())) {
                String status = null;
                if (ua.getAction().equals("approve")) {
                    fileDetails.setUploadstatus("Published");
                } else if (ua.getAction().equals("reject")) {
                    fileDetails.setUploadstatus("Rejected");
                }

            }
        }
        return true;
    }

    public boolean updateStatus(Integer userid, String uploadid, String ustatus) {
        List<FileDetails> list = UserFileDetails.get(userid);
        for (FileDetails fileDetails : list) {
            if (uploadid.equals(fileDetails.getUploadid())) {
                fileDetails.setUploadstatus(ustatus);
            }
        }
        return true;
    }

    public Integer getFilesCount(String uploadStatus) {
        List<FileDetails> allList = new ArrayList<FileDetails>();
        for (Map.Entry<Integer, List<FileDetails>> entry : UserFileDetails.entrySet()) {
            List<FileDetails> list = entry.getValue();
            for (FileDetails fileDetails : list) {
                if (uploadStatus.equals(fileDetails.getUploadstatus())) {
                    allList.add(fileDetails);
                }
            }
        }
        return allList.size();
    }

    public List<FileDetails> getInReviewFiles(Integer perpage, Integer page) {
        List<FileDetails> allList = new ArrayList<FileDetails>();
        for (Map.Entry<Integer, List<FileDetails>> entry : UserFileDetails.entrySet()) {
            List<FileDetails> list = entry.getValue();
            for (FileDetails fileDetails : list) {
                if ("In review".equals(fileDetails.getUploadstatus())) {
                    allList.add(fileDetails);
                }
            }
        }
        Collections.sort(allList, new Comparator<FileDetails>() {
            public int compare(FileDetails arg0, FileDetails arg1) {
                if (getTimeStamp(arg0.getLastupdate()) > getTimeStamp(arg1.getLastupdate())) {
                    return -1;
                }
                if (getTimeStamp(arg0.getLastupdate()) == getTimeStamp(arg1.getLastupdate())) {
                    return 0;
                }
                return 1;
            }
        });
        List<FileDetails> subList = new ArrayList<FileDetails>();
        if (allList.size() > perpage) {
            for (int i = perpage * (page + 1) - perpage + 1; i < perpage * (page + 1) + 1; i++) {
                if (i <= allList.size()) {
                    subList.add(allList.get(i - 1));
                }
            }
        } else {
            subList.addAll(allList);
        }
        return subList;
    }

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
        List<FileDetails> allList = UserFileDetails.get(userId);
        Collections.sort(allList, new Comparator<FileDetails>() {
            public int compare(FileDetails arg0, FileDetails arg1) {
                if (getTimeStamp(arg0.getLastupdate()) > getTimeStamp(arg1.getLastupdate())) {
                    return -1;
                }
                if (getTimeStamp(arg0.getLastupdate()) == getTimeStamp(arg1.getLastupdate())) {
                    return 0;
                }
                return 1;
            }
        });
        return allList;
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


    public Long getTimeStamp(String dateStr) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        try {
            date = format.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date.getTime();
    }
}
