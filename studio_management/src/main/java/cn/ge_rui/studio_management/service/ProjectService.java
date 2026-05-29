package cn.ge_rui.studio_management.service;

import cn.ge_rui.studio_management.entity.Project;

import java.util.List;

public interface ProjectService {
    List<Project> getProjectsList();
    List<Project> getIndvidualProjectsList(String id);
}
