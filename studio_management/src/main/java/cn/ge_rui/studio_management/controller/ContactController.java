package cn.ge_rui.studio_management.controller;

import cn.ge_rui.studio_management.entity.Contact;
import cn.ge_rui.studio_management.service.ContactService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/Contact")
public class ContactController {
    @Resource
    private ContactService contactService;

    @PostMapping("/add")
    public String addContact(@RequestBody Contact contact) {
        contactService.addContact(contact);
        return "发送成功";
    }
}
