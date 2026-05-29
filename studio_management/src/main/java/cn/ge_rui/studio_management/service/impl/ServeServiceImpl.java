package cn.ge_rui.studio_management.service.impl;


import cn.ge_rui.studio_management.entity.Serve;
import cn.ge_rui.studio_management.mapper.ServeMapper;
import cn.ge_rui.studio_management.service.ServeService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServeServiceImpl implements ServeService {

    @Resource
    private ServeMapper serviceMapper;

    @Override
    public List<Serve> getserveList() {
        return serviceMapper.selectserveList();
    }
}
