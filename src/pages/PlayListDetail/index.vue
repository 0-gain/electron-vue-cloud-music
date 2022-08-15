<div class="playlistDetail-wrapper clearfix">
    <div class="playlistDetail-content">
      <div class="detail-content clearfix">
        <div class="cover">
          <img :src="playlistInfo.coverImgUrl" alt="" />
        </div>
        <div class="describe">
          <div class="title">
            <span class="highQuality">精品歌单</span>
            <h2>{{ playlistInfo.name }}</h2>
          </div>

          <div class="create">
            <div class="creator">
              <img :src="creator.avatarUrl" alt="" />
              <span>{{ creator.nickname }}</span>
              <span class="createTime"
                >{{ playlistInfo.createTime | toDate }}创建</span
              >
            </div>
          </div>

          <ul>
            <li>
              <i class="iconfont icon-arrow-right-filling"></i>
              <span>播放全部</span>
              <i class="iconfont icon-zengjia"></i>
            </li>
            <li>
              <i class="iconfont icon-folder-add"></i>
              <span
                >收藏({{ playlistInfo.subscribedCount | numberFormat }})</span
              >
            </li>
            <li>
              <i class="iconfont icon-fenxiang"></i>
              <span>分享({{ playlistInfo.shareCount | numberFormat }})</span>
            </li>
            <li>
              <i class="iconfont icon-xiazai"></i>
              <span>下载全部</span>
            </li>
          </ul>

          <div class="msg">
            <div class="tags">
              标签:
              <span v-for="tag in playlistInfo.tags" :key="tag">
                <a href="javascript:;">{{ tag }} </a>
                <span class="line">/</span>
              </span>
            </div>

            <div class="track">
              歌曲:
              <span class="trackCount">{{ playlistInfo.trackCount }}</span>
              播放:
              <span class="playCount">{{
                playlistInfo.playCount | numberFormat
              }}</span>
            </div>

            <div class="description" :class="{ text: isAddClassText }">
              简介:
              <span>{{ playlistInfo.description }}</span>
              <i
                class="el-icon-caret-top"
                @click="isAddClassText = false"
                v-if="isAddClassText"
              ></i>

              <i
                class="el-icon-caret-bottom"
                @click="isAddClassText = true"
                v-else
              ></i>
            </div>
          </div>
        </div>
      </div>

      <!-- 歌曲列表 -->
      <div class="playList-content">
        <el-tabs value="first" @tab-click="handleClick">
          <!-- 歌曲列表 -->
          <el-tab-pane label="歌曲列表" name="first">
            <el-table :data="musicAllList" stripe @row-dblclick="clickRow">
              <el-table-column
                label=""
                width="40"
                style="width:100%"
                type="index"
                :index="handleIndex"
              >
                <template slot-scope="{ row, $index }">
                  <i
                    v-if="row.id == $store.state.playList.musicId"
                    class="iconfont icon-24gl-volumeZero"
                  ></i>
                  <span v-else>{{ handleIndex($index) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="60px">
                <i class="iconfont icon-aixin2"></i>
                <i class="iconfont icon-xiazai1"></i>
              </el-table-column>
              <el-table-column label="标题" prop="name" width="450">
                <template slot-scope="{ row }">
                  <div
                    class="musicName"
                    :class="{ active: row.id == $store.state.playList.musicId }"
                  >
                    {{ row.name }}
                  </div>
                  <p v-show="row.fee === 1">试听</p>
                </template>
              </el-table-column>
              <el-table-column label="歌手" prop="ar[0].name" >
              </el-table-column>
              <el-table-column label="专辑" prop="al.name"> </el-table-column>
              <el-table-column label="时间" width="80">
                <template slot-scope="{ row }">
                  {{ row.dt | time }}
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- 评论 -->
          <el-tab-pane
            :label="`评论(${playlistInfo.commentCount})`"
            name="second"
          >
            <div class="comment-wrapper" v-loading="loading">
              <!-- 发表评论 -->
              <div class="publish">
                <el-input type="textarea"></el-input>
                <div class="iconList">
                  <span><i class="iconfont icon-xiaolian"></i></span>
                  <span><i class="iconfont icon-aite"></i></span>
                  <span><i class="iconfont icon-huatifuhao"></i></span>
                  <span>评论</span>
                </div>
              </div>

              <!-- 热评 -->
              <div
                class="comments-content"
                v-if="page === 1 && hotComments.length != 0"
              >
                <h5>精彩评论</h5>
                <div
                  class="comments-item"
                  v-for="(item, index) in hotComments"
                  :key="index"
                >
                  <el-avatar
                    :src="item.user.avatarUrl"
                    icon="el-icon-user-solid"
                    size="medium"
                  ></el-avatar>
                  <div class="cntWrap">
                    <div class="des">
                      <span class="name">{{ item.user.nickname }}:</span>
                      <span class="comment">{{ item.content }}</span>
                    </div>
                    <div class="beReplied" v-if="item.beReplied.length">
                      <span class="name"
                        >@{{ item.beReplied[0].user.nickname }}:</span
                      >
                      <span class="comment">{{
                        item.beReplied[0].content
                      }}</span>
                    </div>
                    <div class="otherInfo">
                      <span class="createTime"
                        >{{ item.timeStr }} {{ item.time | time }}</span
                      >
                      <span class="operation">
                        <i class="iconfont icon-dianzan"
                          ><span class="likedCount">{{
                            item.likedCount
                          }}</span></i
                        >
                        <i class="iconfont icon-fenxiang1"></i>
                        <i class="iconfont icon-pinglun"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 最新评论 -->
              <div class="comments-content">
                <h5>最新评论({{ commentTotal }})</h5>
                <div
                  class="comments-item"
                  v-for="(item, index) in comments"
                  :key="index"
                >
                  <el-avatar
                    :src="item.user.avatarUrl"
                    icon="el-icon-user-solid"
                    size="medium"
                  ></el-avatar>
                  <div class="cntWrap">
                    <div class="des">
                      <span class="name">{{ item.user.nickname }}:</span>
                      <span class="comment">{{ item.content }}</span>
                    </div>
                    <div class="beReplied" v-if="item.beReplied.length">
                      <span class="name"
                        >@{{ item.beReplied[0].user.nickname }}:</span
                      >
                      <span class="comment">{{
                        item.beReplied[0].content
                      }}</span>
                    </div>
                    <div class="otherInfo">
                      <span class="createTime"
                        >{{ item.timeStr }} {{ item.time | time }}</span
                      >
                      <span class="operation">
                        <i class="iconfont icon-dianzan"
                          ><span class="likedCount">{{
                            item.likedCount
                          }}</span></i
                        >
                        <i class="iconfont icon-fenxiang1"></i>
                        <i class="iconfont icon-pinglun"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 分页器 @size-change="handleSizeChange" -->
            <el-pagination
              style="text-align: center"
              :current-page="page"
              :page-size="commentLimit"
              layout="prev, pager, next"
              :total="commentTotal"
              background
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </el-tab-pane>
          <!-- 收藏者 -->
          <el-tab-pane label="收藏者" name="third">
            <div class="collectors">
              <div
                class="item"
                v-for="(item, index) in collectors"
                :key="index"
              >
                <el-avatar
                  icon="el-icon-user-solid"
                  :src="item.avatarUrl"
                  size="large"
                ></el-avatar>
                <span class="name"> {{ item.nickname }}</span>
                <i class="el-icon-male" v-if="item.gender === 1"></i>
                <i class="el-icon-female" v-if="item.gender === 2"></i>
              </div>
            </div>

            <el-pagination
              style="text-align: center"
              :current-page="page"
              :page-size="commentLimit"
              layout="prev, pager, next"
              :total="collectorsTotal"
              background
              @current-change="handleCollectorsChange"
            >
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>