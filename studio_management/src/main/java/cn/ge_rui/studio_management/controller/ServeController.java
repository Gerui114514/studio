package cn.ge_rui.studio_management.controller;

import cn.ge_rui.studio_management.entity.Serve;
import cn.ge_rui.studio_management.service.ServeService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/Serve")
public class ServeController {

    @Resource
    private ServeService serveService;

    @GetMapping("/list")
    public List<Serve> getServeList() {
        return serveService.getserveList();
    }
}
