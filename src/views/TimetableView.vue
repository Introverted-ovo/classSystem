<template>
  <div>
    <div style="margin-bottom: 15px">
      <el-input v-model="params.teacher" style="width: 200px" placeholder="请输入教师姓名" v-if="user.role !== 'Student'"></el-input>
      <el-input v-model="params.classname" style="width: 200px; margin-left: 5px" placeholder="请输入班级" v-if="user.role !== 'Teacher'"></el-input>
      <el-input v-model="params.position" style="width: 200px; margin-left: 5px" placeholder="请输入教室位置" v-if="user.role === 'Admin'"></el-input>
      <el-button type="primary" plain icon="el-icon-search" style="margin-left: 5px" @click="findBySearch()"></el-button>
      <el-button type="primary" plain icon="el-icon-refresh-right" style="margin-left: 5px" @click="reset()"></el-button>
      <el-button type="primary" plain icon="el-icon-plus" style="margin-left: 5px" @click="add()" v-if="user.role === 'Admin'"></el-button>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column label="">
        <el-table-column prop="date" label="日期" ></el-table-column>
        <el-table-column prop="am1" label="上午 8：00-9：30" ></el-table-column>
        <el-table-column prop="teacher" label="授课老师" ></el-table-column>
        <el-table-column prop="position" label="上课教室" ></el-table-column>
        <el-table-column prop="am2" label="上午 10：00-11：30" ></el-table-column>
        <el-table-column prop="teacher1" label="授课老师" ></el-table-column>
        <el-table-column prop="position1" label="上课教室" ></el-table-column>
        <el-table-column prop="pm1" label="下午 1：30-3：00" ></el-table-column>
        <el-table-column prop="teacher2" label="授课老师" ></el-table-column>
        <el-table-column prop="position2" label="上课教室" ></el-table-column>
        <el-table-column prop="pm2" label="下午 3：30-5：00" ></el-table-column>
        <el-table-column prop="teacher3" label="授课老师" ></el-table-column>
        <el-table-column prop="position3" label="上课教室" ></el-table-column>
        <el-table-column prop="classname" label="上课班级" ></el-table-column>
        <el-table-column fixed="right" label="操作"  v-if="user.role === 'Admin'">
          <template slot-scope="scope">
            <el-button type="primary" plain icon="el-icon-edit" style="margin-left: 10px" @click="edit(scope.row)" ></el-button>
            <el-popconfirm title="确定删除这一条数据吗？" @confirm="del(scope.row.id)">
              <el-button slot="reference" type="danger" plain icon="el-icon-delete" style="margin-left: 10px"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px">
      <span class="demonstration"></span>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.pageNum"
          :page-sizes="[7]"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
    <div>
      <el-dialog title="请填写信息" :visible.sync="dialogFormVisible" width="40%">
        <el-form :model="form">
          <el-form-item label="日期" label-width="15%">
            <el-input v-model="form.date" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="上午 8：00-9：30" label-width="15%">
            <el-input v-model="form.am1" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="授课老师" label-width="15%">
            <el-input v-model="form.teacher" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="上课教室" label-width="15%">
            <el-input v-model="form.position" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="上午 10：00-11：30" label-width="15%">
            <el-input v-model="form.am2" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="授课老师" label-width="15%">
            <el-input v-model="form.teacher1" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="上课教室" label-width="15%">
            <el-input v-model="form.position1" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="下午 1：30-3：00" label-width="15%">
            <el-input v-model="form.pm1" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="授课老师" label-width="15%">
            <el-input v-model="form.teacher2" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="上课教室" label-width="15%">
            <el-input v-model="form.position2" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="下午 3：30-5：00" label-width="15%">
            <el-input v-model="form.pm2" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="授课老师" label-width="15%">
            <el-input v-model="form.teacher3" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="上课教室" label-width="15%">
            <el-input v-model="form.position3" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="上课班级" label-width="15%">
            <el-input v-model="form.classname" autocomplete="off" style="width: 90%"></el-input>
          </el-form-item>
          <el-table-column fixed="right" label="操作" >
            <template slot-scope="scope">
              <el-button type="primary" plain icon="el-icon-edit" style="margin-left: 10px" @click="edit(scope.row)"></el-button>
              <el-popconfirm title="确定删除这一条数据吗？" @confirm="del(scope.row.id)">
                <el-button slot="reference" type="danger" plain icon="el-icon-delete" style="margin-left: 10px"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>




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
        pageSize: 7
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
      request.get("/timetable/search",{
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
        pageSize: 7
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
      request.post("/timetable",this.form).then(res =>{
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