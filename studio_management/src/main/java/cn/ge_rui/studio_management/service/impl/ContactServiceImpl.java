package cn.ge_rui.studio_management.service.impl;

import cn.ge_rui.studio_management.entity.Contact;
import cn.ge_rui.studio_management.mapper.ContactMapper;
import cn.ge_rui.studio_management.service.ContactService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class ContactServiceImpl implements ContactService {

    @Resource
    private ContactMapper contactMapper;

    @Override
    public void addContact(Contact contact) {
        contactMapper.insertContact(contact);
    }
}
