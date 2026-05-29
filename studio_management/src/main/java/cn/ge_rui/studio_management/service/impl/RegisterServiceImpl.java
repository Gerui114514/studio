package cn.ge_rui.studio_management.service.impl;

import cn.ge_rui.studio_management.mapper.RegisterMapper;
import cn.ge_rui.studio_management.service.RegisterService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Resource
    private RegisterMapper registerMapper;

    @Override
    public int setRegisterDesc(String id, String username, String password, String email, String power){
        return registerMapper.insertRegisterDesc(id, username, password, email, power);
    }
}
