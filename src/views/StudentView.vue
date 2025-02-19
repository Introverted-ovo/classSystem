<template>
  <div>
    <div style="margin-bottom: 15px">
      <el-input v-model="params.name" style="width: 200px" placeholder="请输入姓名"></el-input>
      <el-input v-model="params.sex" style="width: 200px; margin-left: 5px" placeholder="请输入性别"></el-input>
      <el-button type="primary" plain icon="el-icon-search" style="margin-left: 5px" @click="findBySearch()"></el-button>
      <el-button type="primary" plain icon="el-icon-refresh-right" style="margin-left: 5px" @click="reset()"></el-button>
      <el-button type="primary" plain icon="el-icon-plus" style="margin-left: 5px" @click="add()"></el-button>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column prop="name" label="学生姓名" ></el-table-column>
      <el-table-column prop="sex" label="性别" ></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="phone" label="电话" ></el-table-column>
      <el-table-column prop="college" label="所属学院" ></el-table-column>
      <el-table-column prop="profession" label="所属专业" ></el-table-column>
      <el-table-column prop="class0" label="所在班级" ></el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" style="margin-left: 10px" @click="edit(scope.row)"></el-button>
          <el-popconfirm title="确定删除这一条数据吗？" @confirm="del(scope.row.id)">
            <el-button slot="reference" type="danger" plain icon="el-icon-delete" style="margin-left: 10px"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px">
      <span class="demonstration"></span>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
    <div>
      <el-dialog title="请填写信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="姓名" label-width="15%">
            <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="15%">
            <div>
              <el-radio v-model="form.sex" label="男" border>男</el-radio>
              <el-radio v-model="form.sex" label="女" border>女</el-radio>
            </div>
          </el-form-item>
          <el-form-item label="年龄" label-width="15%">
            <el-input v-model="form.age" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="15%">
            <el-input v-model="form.phone" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="所属学院" label-width="15%">
            <el-input v-model="form.college" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="所属专业" label-width="15%">
            <el-input v-model="form.profession" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="所在班级" label-width="15%">
            <el-input v-model="form.class0" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="角色" label-width="15%">
            <el-select v-model="form.role" placeholder="请选择角色" autocomplete="off" :disabled="disableRole">
              <el-option label="Student" value="Student"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      params:{
        name:'',
        sex:'',
        pageNum: 1,
        pageSize: 5
      },
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      form:{},
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },

  created() {
    this.findBySearch();
  },

  methods: {
    findBySearch(){
      request.get("/admin/search2",{
        params: this.params
      }).then(res =>{
        if(res.code === '0'){
          this.tableData = res.data.list;
          this.total = res.data.total;
        }else{

        }
      })
    },
    add(){
      this.form = {};
      this.dialogFormVisible = true;
    },
    edit(obj){
      this.form = obj;
      this.dialogFormVisible = true;
    },
    reset(){
      this.params={
        name:'',
        sex:'',
        pageNum: 1,
        pageSize: 5
      }
      this.findBySearch();
    },
    handleSizeChange(pageSize){
      this.params.pageSize=pageSize;
      this.findBySearch();
    },
    handleCurrentChange(pageNum){
      this.params.pageNum=pageNum;
      this.findBySearch();
    },
    submit(){
      request.post("/admin",this.form).then(res =>{
        if(res.code === '0'){
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.findBySearch();
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    del(id){
      request.post("/admin/"+id).then(res =>{
        if(res.code === '0'){
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.findBySearch();
        } else {
          this.$message.error(res.msg);
        }
      })
    }

  }
}
</script>