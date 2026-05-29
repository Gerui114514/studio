package cn.ge_rui.studio_management.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RegisterMapper {

    @Insert("""
    <script>
    insert into user(id, user_name, passWord, email, power) 
    values (#{id}, #{username}, #{password}, #{email},#{power})
    </script>
    """)
    int insertRegisterDesc(@Param("id") String id,
                           @Param("username") String username,
                           @Param("password") String password,
                           @Param("email") String email,
                           @Param("power") String power
    );
}
