package cn.ge_rui.studio_management.mapper;

import cn.ge_rui.studio_management.entity.Serve;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ServeMapper {
    @Select("""
        select s.service_id, s.service_name, s.service_desc, s.icon, s.image, s.create_time, s.principal_id 
        from serve s 
        order by s.service_id asc 
    """)
    List<Serve> selectserveList();
}
