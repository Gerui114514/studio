package cn.ge_rui.studio_management.service.impl;

import cn.ge_rui.studio_management.entity.BasicUser;
import cn.ge_rui.studio_management.entity.FullUser;
import cn.ge_rui.studio_management.mapper.UserMapper;
import cn.ge_rui.studio_management.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    public UserMapper userMapper;

    @Override
    public List<FullUser> getAllUserList() {
        return userMapper.selectAllUserList();
    }

    @Override
    public FullUser getUser(String username, String email) {
        return  userMapper.selectUser(username, email);
    }

    @Override
    public BasicUser getBasicUser(String username, String email, String password) {
        return userMapper.selectBasicUser(username, email, password);
    }

    @Override
    public void addUser(FullUser fullUser) {
        userMapper.insertUser(fullUser);
    }

    @Override
    public void updateUser(FullUser fullUser) {
        userMapper.updateUser(fullUser);
    }

    @Override
    public void deleteUser(String id) {
        userMapper.deleteUser(id);
    }
}

