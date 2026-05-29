package cn.ge_rui.studio_management.service;

import cn.ge_rui.studio_management.entity.BasicUser;
import cn.ge_rui.studio_management.entity.FullUser;

import java.util.List;

public interface UserService {

    List<FullUser> getAllUserList();

    FullUser getUser(String username, String email);

    BasicUser getBasicUser(String username, String email, String password);

    void addUser(FullUser fullUser);

    void updateUser(FullUser fullUser);

    void deleteUser(String id);
}
