package cn.ge_rui.studio_management.mapper;

import cn.ge_rui.studio_management.entity.Contact;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ContactMapper {
    @Insert("""
    <script>
        insert into contact(contact_name, contact_email, contact_desc, create_time)
        values (#{contactName}, #{contactEmail}, #{contactDesc}, NOW());
    </script>
    """)
    void insertContact(Contact contact);
}
