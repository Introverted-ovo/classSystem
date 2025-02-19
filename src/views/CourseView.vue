<template>
  <div>
    <div style="margin-bottom: 15px">
      <el-input v-model="params.coursename" style="width: 200px" placeholder="请输入课程名称"></el-input>
      <el-button type="primary" plain icon="el-icon-search" style="margin-left: 5px" @click="findBySearch()"></el-button>
      <el-button type="primary" plain icon="el-icon-refresh-right" style="margin-left: 5px" @click="reset()"></el-button>
      <el-button type="primary" plain icon="el-icon-plus" style="margin-left: 5px" @click="add()"></el-button>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column prop="coursename" label="课程名称" ></el-table-column>
      <el-table-column prop="coursetimes" label="课时数" ></el-table-column>
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
          <el-form-item label="课时名称" label-width="15%">
            <el-input v-model="form.coursename" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="课时数" label-width="15%">
            <el-input v-model="form.coursetimes" autocomplete="off" style="width: 90%"></el-input>
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
        coursename:'',
        coursetimes:'',
        pageNum: 1,
        pageSize: 5,
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
      },
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      form:{}
    }
  },

  created() {
    this.findBySearch();
  },

  methods: {
    findBySearch(){
      request.get("/course/search",{
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
        coursename:'',
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
      request.post("/course",this.form).then(res =>{
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
      request.post("/course/"+id).then(res =>{
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