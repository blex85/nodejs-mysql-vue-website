## ���Խӿ�
### �ӿ�ǰ׺
	http://localhost:8088/api
--------------
### ����һ������
	POST   /comment/create
### �������
| ���� | ���� | ˵�� | �Ƿ���� |
| :----: | :----: | :----: |:----:|
| content | �ַ��� | �������� | �� |
| name | �ַ��� | �����˵��ǳ� | �� |
| email| �ַ��� | �����˵����� | �� |
| article_id | ���� | ��������������id | �� |

### �ɹ�����
	{
      "msg": "�����ɹ�",
      "success": true
	}	
### ʧ�ܷ���
	{
      "msg": "�����������",
      "errCode": 40000,
      "code": 400,
      "success": false
	}

--------------
### ɾ����������
	DELETE  /comment/delete/:id
### �������
| ���� | ���� | ˵�� | �Ƿ���� |
| :----: | :----: | :----: |:----:|
| :id | ���� | ����id | �� |


### �ɹ�����
	{
      "msg": "ɾ���ɹ�",
      "success": true
	}	
### ʧ�ܷ���
	{
      "msg": "����Ϊ��",
      "errCode": 40000,
      "code": 400,
      "success": false
	}

--------------
### ��ȡ��������
	GET   /comment/all
### �������
| ���� | ���� | ˵�� | �Ƿ���� |
| :----: | :----: | :----: |:----:|
| page | ���� | ҳ�� | ��Ĭ��Ϊ��һҳ |

### �ɹ�����
	{
	    "data": [
	        {
	            "created_at": "2019-11-18 15:45",
	            "id": 37,
	            "content": null,
	            "name": "qqq",
	            "email": null,
	            "article_id": 5793281,
	            "updated_at": "2019-11-18T07:45:26.000Z"
	        },
	        {
	            "created_at": "2019-11-18 15:51",
	            "id": 38,
	            "content": null,
	            "name": "fdx",
	            "email": null,
	            "article_id": 5793281,
	            "updated_at": "2019-11-18T07:51:07.000Z"
	        },
	        {
	            "created_at": "2019-11-18 16:08",
	            "id": 39,
	            "content": null,
	            "name": "wa",
	            "email": null,
	            "article_id": 5793281,
	            "updated_at": "2019-11-18T08:08:11.000Z"
	        },
	        {
	            "created_at": "2019-11-18 16:24",
	            "id": 40,
	            "content": null,
	            "name": "�޶�Ҳ",
	            "email": null,
	            "article_id": 5793281,
	            "updated_at": "2019-11-18T08:24:39.000Z"
	        },
	        {
	            "created_at": "2019-11-18 16:24",
	            "id": 41,
	            "content": null,
	            "name": "����ѹ��",
	            "email": null,
	            "article_id": 5793281,
	            "updated_at": "2019-11-18T08:24:42.000Z"
	        }
	    ],
	    "meta": {
	        "count": 20,
	        "pageSize": 5,
	        "success": true
	    }
	}

### ʧ�ܷ���
	{
      "msg": "����Ϊ��",
      "errCode": 40004,
      "code": 404,
      "success": false
	}
-------------
### ��ȡ��Ӧ�����µ���������
	GET   /comment/list
### �������
| ���� | ���� | ˵�� | �Ƿ���� |
| :----: | :----: | :----: |:----:|
| page | ���� | ҳ�� | ��Ĭ��Ϊ��һҳ |
| article_id | ���� | ����ID | �� |

### �ɹ�����
	{
	    "data": [
	        {
	            "created_at": "2019-11-25 10:42",
	            "id": 57,
	            "content": null,
	            "name": "ssg",
	            "article_id": 58863249,
	            "replies": []
	        }
	    ],
	    "meta": {
	        "totalComments": 1,
	        "totalReplies": 0,
	        "pageSize": 5,
	        "success": true
	    }
	}
	    
### ʧ�ܷ���
	{
      "msg": "����Ϊ��",
      "errCode": 40004,
      "code": 404,
      "success": false
	}
