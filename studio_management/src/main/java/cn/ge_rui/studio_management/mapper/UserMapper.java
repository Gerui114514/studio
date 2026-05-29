package cn.ge_rui.studio_management.mapper;

import cn.ge_rui.studio_management.entity.BasicUser;
import cn.ge_rui.studio_management.entity.FullUser;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("""
    <script>
    select u.id, u.user_name, u.passWord, u.email, u.power, u.name, u.join_date, u.birth_date, u.region, u.job\s
    from user u
    order by u.id asc
    </script>
    """)
    List<FullUser> selectAllUserList();

    @Select("""
        <script>
        select u.id, u.user_name, u.passWord, u.email, u.power, u.name, u.join_date, u.birth_date, u.region, u.job 
        from user u
        <where>
            <if test="username != null and username != ''">
            and u.user_name = #{username}
            </if>
            <if test="email != null and email != ''">
            and u.email = #{email}
            </if>
        </where>
        </script>
    """)
    FullUser selectUser(@Param("username") String username,
                        @Param("email") String email);

    @Select("""
    <script>
        select u.id, u.user_name, u.name, u.email, u.power, u.region, u.join_date, u.job 
        from user u
        <where>
            <if test="username != null and username != ''">
            and u.user_name = #{username}
            </if>
            <if test="email != null and email != ''">
            and u.email = #{email}
            </if>
            and u.password = #{password}
        </where>
    </script>
    """)
    BasicUser selectBasicUser(String username, String email, String password);

    @Insert("""
    <script>
        insert into user(id, user_name, passWord, email, power, name, join_date, birth_date, region, job) 
        values(#{id}, #{userName}, #{password}, #{email}, #{power}, #{name}, #{joinDate}, #{birthTime}, #{region}, #{job})
    </script>
    """)
    void insertUser(FullUser fullUser);

    @Update("""
    <script>
        update user 
        set id = #{id}, user_name = #{userName}, passWord  = #{password}, email = #{email}, power = #{power}, name = #{name}, 
            join_date = #{joinDate}, birth_date = #{birthTime}, region = #{region}, job = #{job} 
        where id = #{id}
    </script>
    """)
    void updateUser(FullUser fullUser);

    @Delete("""
    <script>
        delete from user where id = #{id}
    </script>
    """)
    void deleteUser(String id);
}
