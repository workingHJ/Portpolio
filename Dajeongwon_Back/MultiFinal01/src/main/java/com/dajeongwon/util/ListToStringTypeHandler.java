package com.dajeongwon.util;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

public class ListToStringTypeHandler extends BaseTypeHandler<List<String>> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, List<String> parameter, JdbcType jdbcType) throws SQLException {
        String categoriesAsString = String.join(",", parameter);
        ps.setString(i, categoriesAsString);
    }

    @Override
    public List<String> getNullableResult(ResultSet rs, String columnName) throws SQLException {
        String categoriesAsString = rs.getString(columnName);
        return Arrays.asList(categoriesAsString.split(","));
    }

    @Override
    public List<String> getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        String categoriesAsString = rs.getString(columnIndex);
        return Arrays.asList(categoriesAsString.split(","));
    }

    @Override
    public List<String> getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        String categoriesAsString = cs.getString(columnIndex);
        return Arrays.asList(categoriesAsString.split(","));
    }
}
