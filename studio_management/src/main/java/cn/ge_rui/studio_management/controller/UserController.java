package cn.ge_rui.studio_management.controller;

import cn.ge_rui.studio_management.entity.BasicUser;
import cn.ge_rui.studio_management.entity.FullUser;
import cn.ge_rui.studio_management.entity.LoginRequest;
import cn.ge_rui.studio_management.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/User")
public class UserController {

    @Resource
    private UserService userService;

    @GetMapping("/alluser")
    public List<FullUser> getAllUserList() {
        return userService.getAllUserList();
    }

    @GetMapping("/singleuser")
    public FullUser getUser(String username, String email) {
        return userService.getUser(username, email);
    }

    @PostMapping("/login")
    public BasicUser login(@RequestBody FullUser request) {
        String username = request.getUserName();
        String email = request.getEmail();
        String password = request.getPassword();

        return userService.getBasicUser(username, email, password);
    }

    @PostMapping("/manage/adduser")
    public String addUser(@RequestBody FullUser fullUser) {
        userService.addUser(fullUser);
        return "新建成功";
    }

    @PostMapping("/manage/updateuser")
    public String updateUser(@RequestBody FullUser fullUser) {
        userService.updateUser(fullUser);
        return "修改成功";
    }

    @GetMapping("/manage/deletuser")
    public String deleteUser(String id) {
        userService.deleteUser(id);
        return "删除成功";
    }
}
