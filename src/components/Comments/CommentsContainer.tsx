// ... continuing from previous code
          const { data: replies } = await supabase
            .from('comments')
            .select(`
              *,
              user:user_id(email),
              reactions_count:comment_reactions(
                reaction_type,
                count
              )
            `)
            .eq('report_id', reportId)
            .eq('parent_id', comment.id)
            .order('created_at', { ascending: true });

          return {
            ...comment,
            replies: replies || [],
          };
        })
      );

      setComments(commentsWithReplies);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [reportId, sortBy]);

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Comments</Typography>
        <FormControl size="small" sx={{ width: 150 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="popular">Popular</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {user && (
        <CommentEditor
          reportId={reportId}
          onCommentSubmitted={fetchComments}
        />
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : comments.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
          No comments yet. Be the first to comment!
        </Typography>
      ) : (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onUpdate={fetchComments}
          />
        ))
      )}
    </Box>
  );
};

export default CommentsContainer;