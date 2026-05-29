package cn.ge_rui.studio_management.controller;

import cn.ge_rui.studio_management.entity.FullUser;
import cn.ge_rui.studio_management.entity.RegisterRequest;
import cn.ge_rui.studio_management.service.RegisterService;
import cn.ge_rui.studio_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/User")
public class RegisterController {

    @Autowired
    private UserService userService;

    @Autowired
    private RegisterService registerService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        // 防止用户列表为null或空
        List<FullUser> user = userService.getAllUserList();
        if (user == null) {
            user = new ArrayList<>();
        }
        // 用户名/邮箱唯一性校验
        for (FullUser fullUser : user) {
            if (fullUser.getUserName().equals(request.getUserName())) {
                return "该用户名已存在";
            }
            if (fullUser.getEmail().equals(request.getEmail())) {
                return "该邮箱已被使用";
            }
        }

        // 生成ID逻辑
        LocalDateTime today = LocalDateTime.now();
        String year = String.valueOf(today.getYear());
        String generatedId;

        if (!user.isEmpty()) {
            FullUser lastUser = user.get(user.size() - 1);
            String lastId = lastUser.getId();

            // 校验ID格式并自增
            if (lastId != null && lastId.length() >= 7 && lastId.startsWith(year)) {
                int numInt = Integer.parseInt(lastId.substring(4));
                numInt += 1;
                String numStr = String.format("%04d", numInt);
                generatedId = year + numStr;
            } else {
                generatedId = year + "0001";
            }
        } else {
            // 列表为空，第一个用户
            generatedId = year + "0001";
        }
        // 设置生成的ID到请求对象
        request.setId(generatedId);

        // 执行数据库写入（关键：接收int返回值）
        int rows = registerService.setRegisterDesc(
                request.getId(),
                request.getUserName(),
                request.getPassword(),
                request.getEmail(),
                request.getPower()
        );

        // 判断是否写入成功，返回Result
        if (rows > 0) {
            return "注册成功";
        } else {
            return "注册失败，数据库未插入数据";
        }
    }
}
