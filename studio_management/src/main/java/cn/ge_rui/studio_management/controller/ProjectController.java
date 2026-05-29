package cn.ge_rui.studio_management.controller;

import cn.ge_rui.studio_management.entity.Project;
import cn.ge_rui.studio_management.service.ProjectService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/Project")
public class ProjectController {

    @Resource
    private ProjectService projectService;

    @GetMapping("/list")
    public List<Project> getProjectsList() {
        return projectService.getProjectsList();
    }

    @GetMapping("/indviduallist")
    public List<Project> getIndvidualProjectsList(String id) {
        return projectService.getIndvidualProjectsList(id);
    }
}
