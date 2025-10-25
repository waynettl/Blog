<template>
  <div id="Creations">
    <a
      v-for="item of list"
      :key="item.link"
      target="_blank"
      :href="item.link"
      class="creation-item"
    >
      <el-card shadow="hover" :body-style="{ padding: 0 }">
        <div class="creation-item-top">
          <img :src="item.img" class="preview-img" />

          <div class="description">
            <p
              v-for="(desc, index) of item.descriptions"
              :key="index"
              class="description-item"
              :style="{ textAlign: item.align }"
            >
              {{ desc }}
            </p>
          </div>
        </div>

        <div class="creation-item-bottom">
          <h1 class="title">{{ item.title }}</h1>
          <p class="synopsis">
            {{ item.synopsis }}
          </p>
        </div>
      </el-card>
    </a>

    <i v-for="item of 4" :key="item" class="placeholder" />
  </div>
</template>

<script lang="ts" setup>
import { Creation } from "./types"

function getAssetUrl(filename: string): string {
  return new URL(`../../../assets/image/creations/${filename}`, import.meta.url)
    .href
}

const list: Creation[] = [
  {
    title: "Swagger",
    synopsis: "可视化 RESTful 风格的 Web 文档服务",
    descriptions: ["REST API 文档", "自动生成测试", "支持多种语言和框架"],
    img: getAssetUrl("swagger.png"),
    link: "https://api.daixu.cn/swagger"
  },
  {
    title: "最终选择",
    synopsis: "摆脱困难选择症，随机为您做出选择",
    descriptions: ["不再选择，心情更美好！"],
    img: getAssetUrl("final-choice.png"),
    link: "https://daixu-cn.github.io/Choice/"
  },
  {
    title: "Lemon",
    synopsis: "Lemon成长相册",
    descriptions: ["我的可爱小柠檬！"],
    img: getAssetUrl("lemon.png"),
    link: "https://photos.app.goo.gl/VxBFkMFJUEr4H4Pz6/"
  }
]
</script>

<style lang="scss">
#Creations {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .creation-item {
    text-decoration: none;
    display: inline-block;
    width: calc(20% - 20px);
    margin-bottom: 20px;
    cursor: pointer;

    .el-card__body {
      padding: 0;
      .creation-item-top {
        box-sizing: border-box;
        width: 100%;
        height: 130px;
        color: $font-color;
        position: relative;
        cursor: pointer;
        font-size: 1.25em;
        transition: all 0.35s;

        &::after,
        &::before {
          content: "";
          position: absolute;
          left: $space;
          right: $space;
          top: $space;
          bottom: $space;
          margin: auto;
          opacity: 0;
          transition: all 1s;
        }

        &::after {
          border-top: 1px solid #fff;
          border-bottom: 1px solid #fff;
          transform: scale(0, 1);
        }
        &::before {
          border-right: 1px solid #fff;
          border-left: 1px solid #fff;
          transform: scale(1, 0);
        }

        .preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          font-size: 0;
          transition: opacity 1s;
        }
        .description {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          position: absolute;
          left: $space;
          right: $space;
          top: $space;
          bottom: $space;
          margin: auto;
          padding: $space;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.5s;

          .description-item {
            color: #fff;
            font-size: $font-size;
            line-height: 1.5em;
            text-align: center;

            @include flex-center;
            @include more-text-ellipsis(4);
          }
        }
      }

      .creation-item-bottom {
        padding: $space;
        height: 80px;
        box-sizing: border-box;

        .title {
          margin-bottom: $space;
        }
        .synopsis {
          color: $font-color-secondary;
          font-size: calc($font-size - 2px);
          line-height: 1.3em;
          @include more-text-ellipsis(2);
        }
      }
    }

    &:hover {
      .el-card__body {
        .creation-item-top {
          background-color: rgba(53, 172, 197, 1);

          &::after,
          &::before {
            opacity: 1;
            transform: scale(1);
          }

          .preview-img {
            opacity: 0.4;
          }

          .description {
            transform: translateY(0);
            opacity: 1;
          }
        }
      }
    }
  }
  .placeholder {
    width: calc(20% - 20px);
    height: 0;
  }

  @media screen and (max-width: 1200px) {
    .creation-item,
    .placeholder {
      width: calc(100% / 4 - 20px);
    }
  }
  @media screen and (max-width: 1000px) {
    .creation-item,
    .placeholder {
      width: calc(100% / 3 - 15px);
    }
  }
  @media screen and (max-width: 678px) {
    .creation-item,
    .placeholder {
      width: calc(100% / 2 - 10px);
    }
  }
  @media screen and (max-width: 480px) {
    .creation-item,
    .placeholder {
      width: 100%;
    }
  }
}
</style>
