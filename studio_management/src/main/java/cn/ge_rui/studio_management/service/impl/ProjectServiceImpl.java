package cn.ge_rui.studio_management.service.impl;

import cn.ge_rui.studio_management.entity.Project;
import cn.ge_rui.studio_management.mapper.ProjectMapper;
import cn.ge_rui.studio_management.service.ProjectService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Resource
    private ProjectMapper projectMapper;

    @Override
    public List<Project> getProjectsList() {
        return projectMapper.selectProjectsList();
    }

    @Override
    public List<Project> getIndvidualProjectsList(String id) {
        return projectMapper.selectIndvidualProjectsList(id);
    }
}
