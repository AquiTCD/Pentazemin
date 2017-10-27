import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const db = {}
db.pomodoros = new Datastore({
  autoload: true,
  // timestampData: true,
  filename: path.join(remote.app.getPath('userData'), '/pomodoros.json'),
})
db.missions = new Datastore({
  autoload: true,
  timestampData: true,
  filename: path.join(remote.app.getPath('userData'), '/missons.json'),
})
db.extras = new Datastore({
  autoload: true,
  timestampData: true,
  filename: path.join(remote.app.getPath('userData'), '/extras.json'),
})
db.notes = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/notes.json'),
})
db.archives = new Datastore({
  autoload: true,
  timestampData: true,
  filename: path.join(remote.app.getPath('userData'), '/archives.json'),
})
db.settings = new Datastore({
  autoload: true,
  timestampData: true,
  filename: path.join(remote.app.getPath('userData'), '/settings.json'),
})

export default {
  notes: {
    getAll(callback) {
      db.notes.find({}, (err, docs) => {
        if (!err) {
          if (docs[0]) {
            callback(docs[0].content)
          }
        }
      })
    },
    update(notes, callback) {
      db.notes.update(
        { content: { $exists: true } },
        { $set: { content: notes } },
        { upsert: true },
        function(err, numReplaced) {
          if (err) {
            alert('error')
          }
        }
      )
    },
    delete(notes, callback) {
      db.notes.remove({ content: { $exists: true } }, {}, function(
        err,
        numReplaced
      ) {
        if (err) {
          alert('error')
        }
      })
    },
  },
  settings: {
    getAll(callback) {
      db.settings.find({}, (err, docs) => {
        if (!err) {
          if (!docs.length) {
            callback(docs)
          } else {
            callback(docs[0].user)
          }
        }
      })
    },
    update(settings, callback) {
      db.settings.update(
        { user: { $exists: true } },
        {
          $set: {
            user: settings,
          },
        },
        { upsert: true },
        function(err, numReplaced) {
          if (err) {
            alert('error')
          }
        }
      )
    },
  },
  pomodoros: {
    getAll(callback) {
      db.pomodoros.find({}, (err, docs) => {
        if (!err) {
          callback(docs)
        }
      })
    },
    reorder(pomodoros, callback) {
      for (let i = 0; i < pomodoros.length; i++) {
        pomodoros[i].index = i + 1
        db.pomodoros.update(
          { id: pomodoros[i].id },
          { $set: { index: pomodoros[i].index } },
          function(err, numReplaced) {
            if (err) {
              alert('error')
            }
          }
        )
      }
    },
    create(content, callback) {
      db.pomodoros.insert(content, function(err) {
        if (err) {
          alert('error')
        }
      })
    },
    delete(id, callback) {
      db.pomodoros.remove({ id: id }, {}, function(err, numReplaced) {
        if (err) {
          alert('error')
        }
      })
    },
    update(pomodoro, callback) {
      db.pomodoros.update(
        { id: pomodoro.id },
        {
          $set: {
            index: pomodoro.index,
            missionId: pomodoro.missionId,
            isComplete: pomodoro.isComplete,
          },
        },
        function(err, numReplaced) {
          if (err) {
            alert('error')
          }
        }
      )
    },
  },
  missions: {
    getAll(callback) {
      db.missions.find({}, (err, docs) => {
        if (!err) {
          callback(docs)
        }
      })
    },
    create(content, callback) {
      db.missions.insert(content, function(err) {
        if (err) {
          alert('error')
        }
      })
    },
    update(mission, callback) {
      db.missions.update(
        { id: mission.id },
        {
          $set: {
            name: mission.name,
            pomodoros: mission.pomodoros,
            quadrant: mission.quadrant,
            tags: mission.tags,
            notes: mission.notes,
            isDeleted: mission.isDeleted,
            remainingSec: mission.remainingSec,
          },
        },
        function(err, numReplaced) {
          if (err) {
            alert('error')
          }
        }
      )
    },
    countdown(mission, callback) {
      db.missions.update(
        { id: mission.id },
        { $set: { remainingSec: mission.remainingSec - 1 } },
        function(err, numReplaced) {
          if (err) {
            alert('error')
          }
        }
      )
    },
    delete(id, callback) {
      db.missions.remove({ id: id }, {}, function(err, numReplaced) {
        if (err) {
          alert('error')
        }
      })
    },
  },
  extras: {
    getAll(callback) {
      db.extras.find({}, (err, docs) => {
        if (!err) {
          callback(docs)
        }
      })
    },
    create(content, callback) {
      db.extras.insert(content, function(err) {
        if (err) {
          alert('error')
        }
      })
    },
    update(extra, callback) {
      db.extras.update(
        { id: extra.id },
        {
          $set: {
            name: extra.name,
            min: extra.min,
            isRepeat: extra.isRepeat,
            tags: extra.tags,
            notes: extra.notes,
            isComplete: extra.isComplete,
            isDeleted: extra.isDeleted,
          },
        },
        function(err, numReplaced) {
          if (err) {
            alert('error')
          }
        }
      )
    },
    delete(id, callback) {
      db.extras.remove({ id: id }, {}, function(err, numReplaced) {
        if (err) {
          alert('error')
        }
      })
    },
  },
  archives: {
    getAll(callback) {
      db.archives.find({}, (err, docs) => {
        if (!err) {
          callback(docs)
        }
      })
    },
    create(archive, callback) {
      db.archives.insert(archive, function(err) {
        if (err) {
          alert('error')
        }
      })
    },
    update(archive, callback) {
      db.archives.update(
        { id: archive.id },
        {
          $set: {
            date: archive.date,
            notes: archive.notes,
            isDeleted: archive.isDeleted,
            missions: archive.missions,
          },
        },
        function(err, numReplaced) {
          if (err) {
            alert('error')
          }
        }
      )
    },
  },
}
