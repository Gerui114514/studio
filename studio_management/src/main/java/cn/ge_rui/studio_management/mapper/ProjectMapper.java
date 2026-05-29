package cn.ge_rui.studio_management.mapper;

import cn.ge_rui.studio_management.entity.Project;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ProjectMapper {

    @Select("""
        <script>
        select p.project_id, p.project_name, p.project_desc, p.icon, p.image, p.create_time, p.principal_id, p.state 
        from project p
        order by p.project_id asc
        </script>
    """)
    List<Project> selectProjectsList();

    @Select("""
        <script>
        select p.project_name, p.project_desc, p.create_time, p.principal_id, p.state
        from project p
        <where>
             <if test="id != '' and id != null">
             and p.principal_id = #{id}
             </if>
        </where>
        order by p.create_time desc
        </script>
    """)
    List<Project> selectIndvidualProjectsList(@Param("id") String id);
}
