# cài môi trường nodejs để chạy source BE
FROM node:20

# tạo thư mục tên là app

WORKDIR /home/app


# copy file package.json và package-lock.json vào thư mục app

COPY package*.json ./


# cài thư viện trong file package.json

RUN yarn install

#copy prisma từ local sang docker
# vừa copy và tạo folder /prisma

COPY prisma ./prisma/


#tạo prisma client

RUN yarn prisma generate


# copy toàn bộ source code vào thư mục app
# . đầu tiên : copy tất cả những file và folder cùng cấp với Dockerfile
# . thứ 2 : folder app mới tạo ở trên
COPY . .

# expose port 8080

EXPOSE 8082

# chạy lệnh npm run start

CMD ["npm","run","start"]

#build docker image
# . : đường dẫn đến dockerfile
# -t : tên image
# docker build . -t node47